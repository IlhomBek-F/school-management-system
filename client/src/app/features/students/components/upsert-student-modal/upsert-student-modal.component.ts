import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { QuestionSelectInput } from '@core/dynamic-form/question-select-input';
import { QuestionTextInput } from '@core/dynamic-form/question-text-input';
import { QuestionFieldTypeEnum } from '@core/enums/question-type.enum';
import { QuestionControlService } from '@core/services/question-control.service';
import { FormGroup } from '@angular/forms';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { QuestionDatePicker } from '@core/dynamic-form/question-datepicker';
import { FormContainer } from '@core/models/question-base';
import { Student, TabItem } from '../../models';
import { GRADES } from 'app/utils/constants';

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
  tabItems!: TabItem[];
  loading!: WritableSignal<boolean>

  private _dialogConfig = inject(DynamicDialogConfig);
  private _questionControlService = inject(QuestionControlService);

  ngOnInit(): void {
    this._createTabItems();
    this.loading = this._dialogConfig.data.loading
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

  isValid(): boolean {
    return !this.tabItems.every(({form}) => form.invalid)
  }

  private _createTabItems() {
    this.tabItems = [
      {
        title: 'Personal Information',
        value: 'personal_info',
        formContainers: this._getPersonalFormContainer(),
        form: this._questionControlService.toFormGroup(this._getPersonalFormContainer())
      },
      {
        title: 'Academic Information',
        value: 'academic_info',
        formContainers: this._getAcademicFormContainer(),
        form: this._questionControlService.toFormGroup(this._getAcademicFormContainer())
      },
    ]
  }

  private _getPersonalFormContainer(): FormContainer[] {
    const {personal_info}: Student = this._dialogConfig.data.student
    return [
      {
        containers: [
          new QuestionTextInput({
            key: 'first_name',
            label: 'First Name',
            required: true,
            value: personal_info.first_name,
            placeholder: 'Enter first name'
          }),
          new QuestionTextInput({
            key: 'last_name',
            label: 'Last Name',
            required: true,
            value: personal_info.last_name,
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
            value: personal_info.date_of_birth
          }),
          new QuestionSelectInput({
            key: 'gender',
            label: 'Gender',
            required: true,
            options: [
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ],
            value: personal_info.gender,
          }),
          new QuestionSelectInput({
            key: 'blood_group_id',
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
            value: personal_info.blood_group_id,
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
            value: personal_info.email
          }),
          new QuestionTextInput({
            key: 'phone_number',
            label: 'Phone Number',
            required: true,
            value: personal_info.phone_number,
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
            value: personal_info.street_address,
            required: true,
          }),
          new QuestionTextInput({
            key: 'city',
            label: 'City',
            placeholder: 'Enter city',
            value: personal_info.city,
            required: true,
          }),
        ],
      },
    ];
  }

  private _getAcademicFormContainer(): FormContainer[] {
    const {academic_info: {
                          student_id,grade_id,
                          class_section_id,
                          admission_date,
                          prev_school,
                          emergency_contact
                        }
          }: Student = this._dialogConfig.data.student;
    return [
      {
        containers: [
          new QuestionTextInput({
            key: 'student_id',
            label: 'Student ID',
            placeholder: 'STU-2024-001',
            value: student_id,
            required: true,
          }),
          new QuestionSelectInput({
            key: 'grade_id',
            label: 'Grade',
            value: grade_id,
            required: true,
            options: GRADES
          }),
        ],
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'class_section_id',
            label: 'Class Section',
            required: true,
            value: class_section_id,
            options: [
              { label: 'Class A', value: 1 },
              { label: 'Class B', value: 2 },
              { label: 'Class C', value: 3 },
            ],
          }),
          new QuestionDatePicker({
            key: 'admission_date',
            label: 'Admission Date',
            value: admission_date,
            required: true,
          }),
        ],
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'prev_school',
            label: 'Previous School',
            value: prev_school,
            placeholder: 'Enter previous school name'
          }),
          new QuestionTextInput({
            key: 'emergency_contact',
            required: true,
            value: emergency_contact,
            label: 'Emergency contact'
          })
        ]
      }
    ];
  }
}
