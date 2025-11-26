import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, forwardRef, inject, input, OnInit, output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AsyncOptionEnum } from '@core/enums/async-option.enum';
import { OptionTypeEnum } from '@core/enums/option-type.enum';
import { AsyncOptionsService } from '@core/services/async-option.service';
import { ToastService } from '@core/services/toast.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { catchError, finalize, Observable, of, throwError } from 'rxjs';

const VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelectComponent),
  multi: true
}

@Component({
  selector: 'school-multi-select',
  imports: [MultiSelectModule, CommonModule, FormsModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [VALUE_ACCESSOR_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComponent implements ControlValueAccessor, OnInit {
  label = input<string>();
  options = input.required<any[]>();
  optionLabel = input('label');
  optionValue = input('value');
  normalizeValue = input<Function>()
  placeholder = input('');
  onChangeEmit = output<any>()
  required = input()
  optionType = input<OptionTypeEnum>()
  asyncOptionType = input<AsyncOptionEnum>()

  value: any[] = [];
  disabled = false;
  loading = false
  private _asyncOptionService = inject(AsyncOptionsService)
  private _messageService = inject(ToastService)

  asyncOptionsPipe$ = computed(() => {
    if (this.optionType() === OptionTypeEnum.ASYNC) {
      this.loading = true;
     return this._asyncOptionService.getAsyncOptionsRequest(this.asyncOptionType() as AsyncOptionEnum)
        .pipe(
          finalize(() => this.loading = false),
          catchError((err) => {
            this._messageService.error(`Failed fetchin async ${this.label()} options`)
            return throwError(() => err)
          })
        )
    }

    return of(this.options())
  })

  ngOnInit(): void {
  }

  // Callbacks
  onChange = (value: any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this.value = value?.map((opt: any) => opt[this.optionValue()])
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChange(event: any) {
    this.value = event.value;
    const _normalizeValueFc = this.normalizeValue()

    if (_normalizeValueFc instanceof Function) {
      const normalizedValue = _normalizeValueFc(this.value)
      this.onChange(normalizedValue);
      this.onChangeEmit.emit(normalizedValue)
    } else {
      this.onChange(this.value)
      this.onChangeEmit.emit(this.value)
    }

    this.onTouched();
  }
}
