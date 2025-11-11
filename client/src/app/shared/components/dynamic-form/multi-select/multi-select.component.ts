import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

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
export class MultiSelectComponent implements ControlValueAccessor{
  label = input();
  options = input.required<any[]>();
  optionLabel = input('label');
  optionValue = input('value');
  normalizeValue = input<Function>()
  placeholder = input('');
  onChangeEmit = output<any>()
  required = input()

  value: any[] = [];
  disabled = false;

  // Callbacks
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value.map((opt: any) => opt[this.optionValue()])
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

    if(_normalizeValueFc instanceof Function) {
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
