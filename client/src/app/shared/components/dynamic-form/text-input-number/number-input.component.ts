import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputNumberInputEvent, InputNumberModule } from "primeng/inputnumber";

const VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumberInputComponent),
  multi: true
}

@Component({
  selector: 'school-number-input',
  imports: [InputNumberModule, CommonModule, FormsModule],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss',
  providers: [VALUE_ACCESSOR_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent {
  label = input()
  placeholder = input('')
  min = input(0)
  max = input()
  required = input()

  onChangeEmit = output<any>()

  value!: any;
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value || '';
    this.onChange(this.value)
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

  handleInput({value}: InputNumberInputEvent): void {
    this.value = value;
    this.onChange(value);
    this.onChangeEmit.emit(value)
    this.onTouched();
  }
}
