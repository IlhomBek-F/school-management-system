import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerModule } from "primeng/datepicker";

const VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimePickerComponent),
  multi: true
}

@Component({
  selector: 'school-time-picker',
  imports: [DatePickerModule, CommonModule, FormsModule],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
  providers: [VALUE_ACCESSOR_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerComponent implements ControlValueAccessor{
  label = input();
  hourFormat = input<string>('24')
  onChangeEmit = output<any>()
  required = input()

  value: any;
  disabled = false;

  // Callbacks
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if(value) {
      const [h, m] = value.split(":").map(Number);
      this.value = new Date(1970, 0, 1, h, m);
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
    const dates = [date.getMinutes(), date.getHours()];
    this.value = event;
    this.onChange(`${dates[1]}:${dates[0]}`);
    this.onChangeEmit.emit(this.value)
    this.onTouched();
  }
}
