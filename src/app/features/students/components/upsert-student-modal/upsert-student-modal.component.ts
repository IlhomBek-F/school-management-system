import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { FormContainer } from '@core/models/form-container';
import { QuestionSelectInput } from '@core/dynamic-form/question-select-input';
import { QuestionTextInput } from '@core/dynamic-form/question-text-input';
import { QuestionFieldTypeEnum } from '@core/enums/question-type.enum';
import { QuestionControlService } from '@core/services/question-control.service';
import { FormGroup } from '@angular/forms';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { QuestionDatePicker } from '@core/dynamic-form/question-datepicker';

@Component({
  selector: 'school-upsert-student-modal.component',
  imports: [TabsModule, DynamicFormComponent, ButtonModule],
  templateUrl: './upsert-student-modal.component.html',
  styleUrl: './upsert-student-modal.component.scss',
  providers: [QuestionControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertStudentModalComponent implements OnInit {
  form!: FormGroup;
  tabItems!: { title: string, value: string, formContainers: FormContainer[] }[];

  private _dialogConfig = inject(DynamicDialogConfig);
  private _questionControlService = inject(QuestionControlService);

  ngOnInit(): void {
    this._createTabItems();

    if (this._dialogConfig.data.student) {
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
        value: 'personal_information',
        formContainers: this._getPersonalFormContainer(),
      },
      {
        title: 'Academic Information',
        value: 'academic_information',
        formContainers: this._getAcademicFormContainer(),
      },
    ]

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
          new QuestionSelectInput({
            key: 'blood_group',
            label: 'Blood group',
            required: true,
            options: [
              { label: 'A+', value: 'A+' },
              { label: 'A-', value: 'A-' },
              { label: 'B+', value: 'B+' },
              { label: 'B-', value: 'B-' },
              { label: 'AB+', value: 'AB+' },
              { label: 'AB-', value: 'AB-' },
              { label: 'O+', value: 'O+' },
              { label: 'O-', value: 'O-' },
            ],
            value: 'A+',
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

  private _getAcademicFormContainer(): FormContainer[] {
    return [
      {
        containers: [
          new QuestionTextInput({
            key: 'student_id',
            label: 'Student ID',
            placeholder: 'STU-2024-001',
            required: true,
            type: QuestionFieldTypeEnum.Number,
          }),
          new QuestionSelectInput({
            key: 'grade',
            label: 'Grade',
            required: true,
            options: [
              { label: '9th Grade', value: '9' },
              { label: '10th Grade', value: '10' },
              { label: '11th Grade', value: '11' },
              { label: '12th Grade', value: '12' },
            ],
          }),
        ],
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'class',
            label: 'Class Section',
            required: true,
            options: [
              { label: 'Class A', value: 'A' },
              { label: 'Class B', value: 'B' },
              { label: 'Class C', value: 'C' },
            ],
          }),
          new QuestionDatePicker({
            key: 'admission_date',
            label: 'Admission Date',
            required: true,
          }),
        ],
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'previous_school',
            label: 'Previous School',
            placeholder: 'Enter previous school name'
          }),
          new QuestionTextInput({
            key: 'emergency_contact',
            required: true,
            label: 'Emergency contact'
          })
        ]
      }
    ];
  }
}
