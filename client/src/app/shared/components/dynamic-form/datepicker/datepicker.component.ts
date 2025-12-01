import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerModule, DatePickerTypeView } from 'primeng/datepicker';

const VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerComponent),
  multi: true
}

@Component({
  selector: 'school-datepicker',
  imports: [DatePickerModule, CommonModule, FormsModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  providers: [VALUE_ACCESSOR_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent implements ControlValueAccessor{
  label = input();
  onChangeEmit = output<any>()
  required = input()
  view = input<DatePickerTypeView>("date")
  value: any;
  disabled = false;

  // Callbacks
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if(this.view() === 'year') {
      this.value = new Date(value, 0, 1);
    } else {
      this.value = value
    }
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
    const date = new Date(event)
    const dates = [date.getDay(), date.getMonth(), date.getFullYear()];
    const formatedValue = this.view() === 'year' ? dates[2] : this.view() === 'month' ? dates[1] : dates.join('-')

    this.value = event;

    this.onChange(formatedValue);
    this.onChangeEmit.emit(this.value)
    this.onTouched();
  }
}
