import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DynamicFormComponent } from "../dynamic-form/dynamic-form.component";
import { QuestionTextInput } from '../../../core/dynamic-form/question-text-input';
import { QuestionSelectInput } from '../../../core/dynamic-form/question-select-input';
import { QuestionControlService } from '../../../core/services/question-control.service';
import { QuestionBase } from '../../../core/dynamic-form/question-base';

@Component({
  selector: 'school-dynamic-modal',
  imports: [DynamicFormComponent],
  templateUrl: './dynamic-modal.component.html',
  styleUrl: './dynamic-modal.component.scss',
  providers: [QuestionControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicModalComponent {

  questions = signal([
      new QuestionSelectInput({
        key: 'animal',
        label: 'Favorite Animal',
        options: [
          {value: 'cat', label: 'Cat'},
          {value: 'dog', label: 'Dog'},
          {value: 'horse', label: 'Horse'},
          {value: 'capybara', label: 'Capybara'},
        ],
        order: 3,
        value: 'capybara',
        onValueChange: (value: any, questions?: QuestionBase<string>[]) => {
             console.log(value, questions)
        }
      }),
      new QuestionTextInput({
        key: 'firstName',
        label: 'First name',
        value: 'Alex',
        required: true,
        order: 1,
        onValueChange: (value: any, questions?: QuestionBase<string>[]) => {
             console.log(value, questions)
        }
      }),
      new QuestionTextInput({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
        onValueChange: (value: any, questions?: QuestionBase<string>[]) => {
             console.log(value, questions)
        }
      }),
    ])
}
