import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QuestionBase } from '../../../../core/dynamic-form/question-base';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionTypeEnum } from '../../../../core/enums/question-type.enum';
import { TextInputComponent } from "../../text-input/text-input.component";
import { SelectInputComponent } from "../../select-input/select-input.component";

@Component({
  selector: 'school-dynamic-form-field',
  imports: [TextInputComponent, SelectInputComponent, ReactiveFormsModule],
  templateUrl: './dynamic-form-field.component.html',
  styleUrl: './dynamic-form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormFieldComponent {
  readonly question = input.required<QuestionBase<string>>();
  readonly form = input.required<FormGroup>();
  readonly QuestionTypeEnum = QuestionTypeEnum;

  get isValid() {
    return this.form().controls[this.question().key].valid;
  }
}
