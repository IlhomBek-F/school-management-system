import { ChangeDetectionStrategy, Component, inject, OnInit, WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionDatePicker } from '@core/dynamic-form/question-datepicker';
import { QuestionMultiSelect } from '@core/dynamic-form/question-multi-select';
import { QuestionSelectInput } from '@core/dynamic-form/question-select-input';
import { QuestionTextInput } from '@core/dynamic-form/question-text-input';
import { AsyncOptionEnum } from '@core/enums/async-option.enum';
import { OptionTypeEnum } from '@core/enums/option-type.enum';
import { QuestionFieldTypeEnum } from '@core/enums/question-type.enum';
import { TabItem } from '@core/models/base';
import { FormContainer } from '@core/models/question-base';
import { Subject } from '@core/models/subject';
import { QuestionControlService } from '@core/services/question-control.service';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { StudentsService } from 'app/features/students/services/students.service';
import { DEPARTMENTS } from 'app/utils/constants';
import {  ButtonModule } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TabsModule } from "primeng/tabs";

@Component({
  selector: 'school-upsert-teacher-modal',
  imports: [TabsModule, DynamicFormComponent, TabsModule, ButtonModule],
  templateUrl: './upsert-teacher-modal.component.html',
  styleUrl: './upsert-teacher-modal.component.scss',
  providers: [QuestionControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertTeacherModalComponent implements OnInit {
  tabItems!: TabItem[]
  loading!: WritableSignal<boolean>

  private _questionControlService = inject(QuestionControlService)
  private _dialogConfig = inject(DynamicDialogConfig)

  ngOnInit(): void {
    this._createTabItems()
    this.loading = this._dialogConfig.data.loading;
  }

  confirm() {
    const formValue = this.tabItems.reduce((prev: Record<string, any>, curr) => {
      prev[curr.value] = curr.form.getRawValue();
      return prev
    }, {})

    this._dialogConfig.data.footer.onConfirm(formValue);
  }

  cancel() {
    this._dialogConfig.data.footer.onCancel();
  }

  private _createTabItems() {
    const personalInfoFormContainers = this._getPersonalFormContainer()
    const professionalFormContainers = this._getProfessionalFormContainer()
    const employmentFormContainers = this._getEmploymentFormContainer()

    this.tabItems = [
      {
        title: 'Personal Information',
        value: 'personal_info',
        formContainers: personalInfoFormContainers,
        form: this._questionControlService.toFormGroup(personalInfoFormContainers)
      },
      {
        title: 'Professional Information',
        value: 'professional_info',
        formContainers: professionalFormContainers,
        form: this._questionControlService.toFormGroup(professionalFormContainers)
      },
      {
        title: 'Employment details',
        value: 'employment_details',
        formContainers: employmentFormContainers,
        form:  this._questionControlService.toFormGroup(employmentFormContainers)
      }
    ];
  }

  private _getPersonalFormContainer(): FormContainer[] {
    return [
      {
        containers: [
          new QuestionTextInput({
            key: 'first_name',
            label: 'First Name',
            required: true,
            placeholder: 'Enter first name'
          }),
          new QuestionTextInput({
            key: 'last_name',
            label: 'Last Name',
            required: true,
            placeholder: 'Enter last name'
          }),
        ],
      },
      {
        containers: [
          new QuestionDatePicker({
            key: 'date_of_birth',
            label: 'Date of birth',
            required: true,
          }),
          new QuestionSelectInput({
            key: 'gender',
            label: 'Gender',
            required: true,
            options: [
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ],
            value: 'male',
          }),
        ],
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'email',
            label: 'Email Address',
            placeholder: 'student@example.com',
            type: QuestionFieldTypeEnum.Email,
          }),
          new QuestionTextInput({
            key: 'phone_number',
            label: 'Phone Number',
            required: true,
            type: QuestionFieldTypeEnum.Email,
          }),
        ],
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'street_address',
            label: 'Street Address',
            placeholder: 'Enter street address',
            required: true,
          }),
          new QuestionTextInput({
            key: 'city',
            label: 'City',
            placeholder: 'Enter city',
            required: true,
          }),
        ],
      },
    ];
  }

  private _getProfessionalFormContainer(): FormContainer[] {
    return [
      {
        containers: [
          new QuestionTextInput({
            key: 'teacher_id',
            label: 'Teacher ID',
            placeholder: 'STU-2024-001',
            required: true,
          }),
          new QuestionSelectInput({
            key: 'department_id',
            label: 'Department',
            required: true,
            options: DEPARTMENTS
          }),
        ],
      },
      {
        containers: [
          new QuestionMultiSelect({
            key: 'subjects',
            label: 'Subjects',
            required: true,
            optionValue: "id",
            optionLabel: "name",
            optionType: OptionTypeEnum.ASYNC,
            asyncOptionType: AsyncOptionEnum.SUBJECTS,
            normalizeValue: (subject_ids: number[], options: Subject[]) => {
              return options.filter(({ id }) => subject_ids.includes(id))
            },
          }),
          new QuestionSelectInput({
            key: 'qualification',
            label: 'Highest Qualification',
            required: true,
            options: [
              { label: 'Bachelor\'s Degree', value: 'bachelors' },
              { label: 'Master\'s Degree', value: 'masters' },
              { label: 'Doctorate (Ph.D.)', value: 'doctorate' },
              { label: 'Other', value: 'other' }
            ],
          }),
        ],
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'uni_or_ins_name',
            label: 'University/Institution',
            placeholder: 'Enter university name'
          }),
          new QuestionDatePicker({
            key: 'graduation_year',
            label: 'Graduation year',
            view: 'year'
          }),
          new QuestionTextInput({
            key: 'experience',
            label: 'Years of Experience',
            required: true,
            type: QuestionFieldTypeEnum.Number,
          })
        ]
      }
    ];
  }
  private _getEmploymentFormContainer(): FormContainer[] {
    return [
      {
        containers: [
          new QuestionDatePicker({
            key: 'joining_date',
            label: 'Joining date'
          }),
          new QuestionSelectInput({
            key: 'employment_type_id',
            label: 'Employment type',
            options: [
              { label: 'Full-Time', value: 1 },
              { label: 'Part-Time', value: 2 },
              { label: 'Contract', value: 3 },
            ]
          })
        ]
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'salary',
            label: 'Salary',
            type: QuestionFieldTypeEnum.Number
          }),
          new QuestionDatePicker({
            key: 'contract_end_date',
            label: 'Contract end date'
          })
        ]
      }
    ]
  }
}
