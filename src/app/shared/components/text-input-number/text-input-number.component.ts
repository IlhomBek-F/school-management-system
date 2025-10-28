import { ChangeDetectionStrategy, Component, forwardRef, input, output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputNumberModule } from "primeng/inputnumber";

const VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextInputNumberComponent),
  multi: true
}

@Component({
  selector: 'school-text-input-number',
  imports: [InputNumberModule],
  templateUrl: './text-input-number.component.html',
  styleUrl: './text-input-number.component.scss',
  providers: [VALUE_ACCESSOR_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputNumberComponent {
  label = input()
  placeholder = input('')
  min = input()
  max = input()
  onChangeEmit = output<number>()

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
