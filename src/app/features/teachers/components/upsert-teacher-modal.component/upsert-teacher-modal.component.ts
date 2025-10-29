import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionDatePicker } from '@core/dynamic-form/question-datepicker';
import { QuestionSelectInput } from '@core/dynamic-form/question-select-input';
import { QuestionTextInput } from '@core/dynamic-form/question-text-input';
import { QuestionFieldTypeEnum } from '@core/enums/question-type.enum';
import { FormContainer } from '@core/models/form-container';
import { QuestionControlService } from '@core/services/question-control.service';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
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
  form!: FormGroup;
  tabItems!: { title: string, value: string, formContainers: FormContainer[]}[];

  private _questionControlService = inject(QuestionControlService)
  private _dialogConfig = inject(DynamicDialogConfig)

  ngOnInit(): void {
    this._createTabItems()

    if (this._dialogConfig.data.teacher) {
      this.form.patchValue(this._dialogConfig.data.student)
    }
  }

  confirm() {
    this._dialogConfig.data.footer.onConfirm(this.form.getRawValue());
  }

  cancel() {
    this._dialogConfig.data.footer.onCancel();
  }

  private _createTabItems() {
    this.tabItems = [
      {
        title: 'Personal Information',
        value: 'personal_info',
        formContainers: this._getPersonalFormContainer(),
      },
      {
        title: 'Professional Information',
        value: 'academic_info',
        formContainers: this._getProfessionalFormContainer(),
      },
      {
        title: 'Employment details',
        value: 'employment_details',
        formContainers: this._getEmploymentFormContainer()
      }
    ];

    this.form = this._questionControlService.toFormGroup(this.tabItems.flatMap(t => t.formContainers))
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
            key: 'phone',
            label: 'Phone Number',
            required: true,
            type: QuestionFieldTypeEnum.Email,
          }),
        ],
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'address',
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
            type: QuestionFieldTypeEnum.Number,
          }),
          new QuestionSelectInput({
            key: 'department',
            label: 'Department',
            required: true,
            options: [
                { label: 'Science & Math', value: 'science_math' },
                { label: 'Languages', value: 'languages' },
                { label: 'Social Studies', value: 'social_studies' },
                { label: 'Arts', value: 'arts' },
                { label: 'Physical Education', value: 'physical_education' },
                { label: 'Computer Science', value: 'computer_science' }
            ],
          }),
        ],
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'subjects',
            label: 'Subjects',
            required: true,
            options: [
              { label: 'Mathematics', value: 'mathematics' },
              { label: 'Physics', value: 'physics' },
              { label: 'Chemistry', value: 'chemistry' },
              { label: 'Biology', value: 'biology' },
              { label: 'English', value: 'english' },
              { label: 'Spanish', value: 'spanish' },
              { label: 'History', value: 'history' },
              { label: 'Geography', value: 'geography' },
              { label: 'Computer Science', value: 'computer_science' },
              { label: 'Physical Education', value: 'physical_education' }
            ],
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
            key: 'university',
            label: 'University/Institution',
            placeholder: 'Enter university name'
          }),
          new QuestionDatePicker({
            key: 'graduation_year',
            label: 'Graduation year',
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
            key: 'employment_type',
            label: 'Employment type',
            options: [
              { label: 'Full-Time', value: 'full_time' },
              { label: 'Part-Time', value: 'part_time' },
              { label: 'Contract', value: 'contract' },
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
