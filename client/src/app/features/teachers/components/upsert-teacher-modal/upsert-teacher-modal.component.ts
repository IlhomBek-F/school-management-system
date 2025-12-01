import { ChangeDetectionStrategy, Component, inject, OnInit, WritableSignal } from '@angular/core';
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
import { DEPARTMENTS } from 'app/utils/constants';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TabsModule } from "primeng/tabs";
import { Teacher } from '../../models';

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
    console.log(formValue)
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
        form: this._questionControlService.toFormGroup(employmentFormContainers)
      }
    ];
  }

  private _getPersonalFormContainer(): FormContainer[] {
    const teacher: Teacher = this._dialogConfig.data.teacher || {
      personal_info: {},
      professional_info: {},
      employment_detail: {}
    }
    return [
      {
        containers: [
          new QuestionTextInput({
            key: 'first_name',
            label: 'First Name',
            required: true,
            value: teacher.personal_info.first_name,
            placeholder: 'Enter first name'
          }),
          new QuestionTextInput({
            key: 'last_name',
            label: 'Last Name',
            required: true,
            value: teacher.personal_info.last_name,
            placeholder: 'Enter last name'
          }),
        ],
      },
      {
        containers: [
          new QuestionDatePicker({
            key: 'date_of_birth',
            label: 'Date of birth',
            value: teacher.personal_info.date_of_birth,
            required: true,
          }),
          new QuestionSelectInput({
            key: 'gender',
            label: 'Gender',
            required: true,
            value: teacher.personal_info.gender,
            options: [
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ],
          }),
        ],
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'email',
            label: 'Email Address',
            required: true,
            value: teacher.personal_info.email,
            placeholder: 'student@example.com',
            type: QuestionFieldTypeEnum.Email,
          }),
          new QuestionTextInput({
            key: 'phone_number',
            label: 'Phone Number',
            required: true,
            value: teacher.personal_info.phone_number,
            type: QuestionFieldTypeEnum.Email,
          }),
        ],
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'street_address',
            label: 'Street Address',
            value: teacher.personal_info.street_address,
            placeholder: 'Enter street address',
            required: true,
          }),
          new QuestionTextInput({
            key: 'city',
            label: 'City',
            value: teacher.personal_info.city,
            placeholder: 'Enter city',
            required: true,
          }),
        ],
      },
    ];
  }

  private _getProfessionalFormContainer(): FormContainer[] {
    const teacher: Teacher = this._dialogConfig.data.teacher || {
      personal_info: {},
      professional_info: {},
      employment_detail: {}
    }

    return [
      {
        containers: [
          new QuestionTextInput({
            key: 'teacher_id',
            label: 'Teacher ID',
            placeholder: 'STU-2024-001',
            value: teacher.professional_info.teacher_id,
            required: true,
          }),
          new QuestionSelectInput({
            key: 'department_id',
            label: 'Department',
            required: true,
            value: teacher.professional_info.department_id,
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
            value: teacher.professional_info.subjects,
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
            value: teacher.professional_info.qualification,
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
            value: teacher.professional_info.uni_or_ins_name,
            placeholder: 'Enter university name'
          }),
          new QuestionDatePicker({
            key: 'graduation_year',
            label: 'Graduation year',
            value: teacher.professional_info.graduation_year,
            view: 'year'
          }),
          new QuestionTextInput({
            key: 'experience',
            label: 'Years of Experience',
            required: true,
            value: teacher.professional_info.experience,
            type: QuestionFieldTypeEnum.Number,
          })
        ]
      }
    ];
  }
  private _getEmploymentFormContainer(): FormContainer[] {
    const teacher: Teacher = this._dialogConfig.data.teacher || {
      personal_info: {},
      professional_info: {},
      employment_detail: {}
    }

    return [
      {
        containers: [
          new QuestionDatePicker({
            key: 'joining_date',
            label: 'Joining date',
            value: teacher.employment_detail.joining_date
          }),
          new QuestionSelectInput({
            key: 'employment_type_id',
            label: 'Employment type',
            value: teacher.employment_detail.employment_type_id,
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
            value: teacher.employment_detail.salary,
            type: QuestionFieldTypeEnum.Number
          }),
          new QuestionDatePicker({
            key: 'contract_end_date',
            value: teacher.employment_detail.contract_end_date,
            label: 'Contract end date'
          })
        ]
      }
    ]
  }
}
