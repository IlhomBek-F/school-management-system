import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { FormContainer } from '../../../../core/models/form-container';
import { QuestionSelectInput } from '../../../../core/dynamic-form/question-select-input';
import { QuestionTextInput } from '../../../../core/dynamic-form/question-text-input';
import { QuestionBase } from '../../../../core/dynamic-form/question-base';
import { QuestionFieldTypeEnum } from '../../../../core/enums/question-type.enum';
import { QuestionControlService } from '../../../../core/services/question-control.service';
import { FormGroup } from '@angular/forms';
import { DynamicFormComponent } from "../../../../shared/components/dynamic-form/dynamic-form.component";

@Component({
  selector: 'school-upsert-student-modal.component',
  imports: [TabsModule, DynamicFormComponent],
  templateUrl: './upsert-student-modal.component.html',
  styleUrl: './upsert-student-modal.component.scss',
  providers: [QuestionControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertStudentModalComponent implements OnInit{
  private _questionControlService = inject(QuestionControlService)
  form!: FormGroup;

  tabItems = [
    {title: "Personal Information", value: 'personal_information', formContainers: signal<FormContainer[]>([])},
    {title: "Contact Information", value: 'contact_information', formContainers: signal<FormContainer[]>([])},
    {title: "Academic Information", value: 'academic_information', formContainers: signal<FormContainer[]>([])}
  ]

  ngOnInit(): void {
    const formContainer: Record<any, FormContainer[]> = {
      personal_information: this._getPersonalFormContainer(),
      contact_information: this._getPersonalFormContainer(),
      academic_information: this._getPersonalFormContainer(),
    }

    this.form = this._questionControlService.toFormGroup([
      ...formContainer['personal_information'],
      ...formContainer['contact_information'],
      ...formContainer['academic_information']
    ])

    this.tabItems.forEach(({formContainers, value}) => formContainers.set(formContainer[value]))
  }

  private _getPersonalFormContainer(): FormContainer[] {
    return [{
          containers: [
            new QuestionSelectInput({
              key: 'animal',
              label: 'Favorite Animal',
              options: [
                { value: 'cat', label: 'Cat' },
                { value: 'dog', label: 'Dog' },
                { value: 'horse', label: 'Horse' },
                { value: 'capybara', label: 'Capybara' },
              ],
              value: 'capybara',
              onValueChange: (value: any, questions?: QuestionBase<string>[]) => {
                console.log(value, questions);
              },
            }),

            new QuestionTextInput({
              key: 'firstName',
              label: 'First name',
              value: 'Alex',
              type: QuestionFieldTypeEnum.Number,
              required: true,
              onValueChange: (value: any, questions?: QuestionBase<string>[]) => {
                console.log(value, questions);
              },
            }),
          ],
        },
      ]
  }
}
