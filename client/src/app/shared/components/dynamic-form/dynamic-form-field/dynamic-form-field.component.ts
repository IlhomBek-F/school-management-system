import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionFieldTypeEnum, QuestionTypeEnum } from '@core/enums/question-type.enum';
import { TextInputComponent } from "../text-input/text-input.component";
import { SelectInputComponent } from "../select-input/select-input.component";
import { TimePickerComponent } from '@shared/components/dynamic-form/time-picker/time-picker.component';
import { TextareaInputComponent } from '@shared/components/dynamic-form/textarea-input/textarea-input.component';
import { MultiSelectComponent } from '@shared/components/dynamic-form/multi-select/multi-select.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { QuestionBaseType } from '@core/models/question-base';
import { NumberInputComponent } from '../text-input-number/number-input.component';
import { OptionTypeEnum } from '@core/enums/option-type.enum';


@Component({
  selector: 'school-dynamic-form-field',
  imports: [
    TextInputComponent,
    ReactiveFormsModule,
    NumberInputComponent,
    DatepickerComponent,
    TimePickerComponent,
    SelectInputComponent,
    TextareaInputComponent,
    MultiSelectComponent,
    PasswordInputComponent
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
  readonly OptionTypeEnum = OptionTypeEnum

  get isValid() {
    return this.form().controls[this.question().key].valid;
  }
}
