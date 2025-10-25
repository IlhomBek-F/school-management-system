import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { DropdownModule } from "primeng/dropdown";

@Component({
  selector: 'school-select-input',
  imports: [DropdownModule, FormsModule, CommonModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss',
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
