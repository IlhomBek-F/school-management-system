import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownModule } from "primeng/dropdown";

const VALUE_ACCESSOR_PROVIDER = {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true
    }

@Component({
  selector: 'school-select-input',
  imports: [DropdownModule, FormsModule, CommonModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss',
  providers: [VALUE_ACCESSOR_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectInputComponent implements ControlValueAccessor {
   label = input();
   options = input.required<any[]>();
   optionLabel = input('label');
   optionValue = input('value');
   placeholder = input('');
   onChangeEmit = output<any>()

  value: any;
  disabled = false;

  // Callbacks
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
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
    this.onChange(this.value);
    this.onChangeEmit.emit(this.value)
    this.onTouched();
  }
}
