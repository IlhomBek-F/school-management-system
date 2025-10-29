import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionFieldTypeEnum, QuestionTypeEnum } from '@core/enums/question-type.enum';
import { TextInputComponent } from "../../text-input/text-input.component";
import { SelectInputComponent } from "../../select-input/select-input.component";
import { TextInputNumberComponent } from '../../text-input-number/text-input-number.component';
import { DatepickerComponent } from '../../datepicker/datepicker.component';
import { TimePickerComponent } from '@shared/components/time-picker/time-picker.component';
import { QuestionTimePicker } from '@core/dynamic-form/question-time-picker';
import { QuestionSelectInput } from '@core/dynamic-form/question-select-input';
import { QuestionTextInput } from '@core/dynamic-form/question-text-input';
import { QuestionDatePicker } from '@core/dynamic-form/question-datepicker';
import { QuestionTextArea } from '@core/dynamic-form/question-textarea';
import { TextareaInputComponent } from '@shared/components/textarea-input/textarea-input.component';

type QuestionBaseType = QuestionTimePicker | QuestionSelectInput | QuestionTextInput | QuestionDatePicker | QuestionTextArea

@Component({
  selector: 'school-dynamic-form-field',
  imports: [
    TextInputComponent,
    ReactiveFormsModule,
    TextInputNumberComponent,
    DatepickerComponent,
    TimePickerComponent,
    SelectInputComponent,
    TextareaInputComponent
  ],
  templateUrl: './dynamic-form-field.component.html',
  styleUrl: './dynamic-form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormFieldComponent {
  readonly question = input.required<QuestionBaseType>();
  readonly form = input.required<FormGroup>();
  readonly QuestionTypeEnum = QuestionTypeEnum;
  readonly QuestionFieldTypeEnum = QuestionFieldTypeEnum

  get isValid() {
    return this.form().controls[this.question().key].valid;
  }
}
