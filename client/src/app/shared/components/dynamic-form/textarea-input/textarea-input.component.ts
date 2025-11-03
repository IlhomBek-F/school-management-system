import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaInputComponent),
  multi: true
}

@Component({
  selector: 'school-textarea-input',
  imports: [CommonModule],
  templateUrl: './textarea-input.component.html',
  styleUrl: './textarea-input.component.scss',
  providers: [VALUE_ACCESSOR_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaInputComponent implements ControlValueAccessor{
  label = input()
  placeholder = input('')
  required = input()
  onChangeEmit = output<string>()

  value: string = '';
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value || '';
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

  handleInput(event: any): void {
    const value = event.target.value;
    this.value = value;
    this.onChange(value);
    this.onChangeEmit.emit(value)
    this.onTouched();
  }
}
