import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TabsModule } from "primeng/tabs";
import { DynamicFormComponent } from "@shared/components/dynamic-form/dynamic-form.component";
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '@core/services/question-control.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { QuestionTextInput } from '@core/dynamic-form/question-text-input';
import { QuestionSelectInput } from '@core/dynamic-form/question-select-input';
import { QuestionTextArea } from '@core/dynamic-form/question-textarea';
import { QuestionDatePicker } from '@core/dynamic-form/question-datepicker';
import { QuestionTimePicker } from '@core/dynamic-form/question-time-picker';
import { QuestionFieldTypeEnum } from '@core/enums/question-type.enum';
import { ButtonModule } from 'primeng/button';
import { QuestionMultiSelect } from '@core/dynamic-form/question-multi-select';
import { FormContainer } from '@core/models/question-base';

@Component({
  selector: 'school-upsert-class-modal',
  imports: [TabsModule, DynamicFormComponent, ButtonModule],
  templateUrl: './upsert-class-modal.compoment.html',
  styleUrl: './upsert-class-modal.compoment.scss',
  providers: [QuestionControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertClassModalCompoment {
  form!: FormGroup;
  tabItems!: { title: string, value: string, formContainers: FormContainer[]}[];

  private _questionControlService = inject(QuestionControlService)
  private _dialogConfig = inject(DynamicDialogConfig)

  ngOnInit(): void {
    this._createTabItems()

    if (this._dialogConfig.data.class) {
      this.form.patchValue(this._dialogConfig.data.class)
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
        title: 'Basic Information',
        value: 'basic_info',
        formContainers: this._getBasicFormContainer(),
      },
      {
        title: 'Schedule Information',
        value: 'schedule_info',
        formContainers: this._getScheduleFormContainer(),
      },
    ];

    this.form = this._questionControlService.toFormGroup(this.tabItems.flatMap(t => t.formContainers))
  }

  private _getBasicFormContainer(): FormContainer[] {
    return [
      {
        containers: [
          new QuestionTextInput({
            key: 'name',
            label: 'Classname',
            required: true,
          }),
          new QuestionTextInput({
            key: 'code',
            label: 'Class code',
            required: true,
          })
        ]
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'subject',
            label: 'Subject',
            required: true,
            options: [
              { label: 'Mathematics', value: 'mathematics' },
              { label: 'Chemistry', value: 'chemistry' },
              { label: 'Physics', value: 'physics' },
              { label: 'English', value: 'english' },
              { label: 'Biology', value: 'biology' },
              { label: 'French', value: 'french' },
              { label: 'Spanish', value: 'spanish' },
              { label: 'Geography', value: 'geography' },
              { label: 'History', value: 'history' },
              { label: 'Physical Education', value: 'pe' },
              { label: 'Computer Science', value: 'cs' },
              { label: 'Music', value: 'music' },
              { label: 'Art', value: 'art' },
            ]
          }),
          new QuestionSelectInput({
            key: 'teacher',
            label: 'Teacher',
            required: true,
            options: [
              { label: 'Dr. Sarah Johnson - Mathematics', value: 'teacher_1' },
              { label: 'Prof. Michael Chen - Physics', value: 'teacher_2' },
              { label: 'Ms. Emily Rodriguez - English', value: 'teacher_3' },
              { label: 'Mr. David Wilson - History', value: 'teacher_4' },
              { label: 'Dr. Lisa Anderson - Chemistry', value: 'teacher_5' },
              { label: 'Mr. James Brown - Physical Education', value: 'teacher_6' }
            ]
          })
        ],
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'grade',
            label: 'Grade',
            required: true,
            options: [
              { label: '9th Grade', value: '9' },
              { label: '11th Grade', value: '11' },
              { label: '10th Grade', value: '10' },
              { label: '12th Grade', value: '12' }
            ]
          }),
          new QuestionSelectInput({
            key: 'section',
            label: 'Section',
            required: true,
            options: [
                { label: 'Section A', value: 'A' },
                { label: 'Section B', value: 'B' },
                { label: 'Section C', value: 'C' },
                { label: 'Section D', value: 'D' }
            ]
          }),
          new QuestionSelectInput({
            key: 'type',
            label: 'Class type',
            required: true,
            options: [
                { label: 'Theory', value: 'theory' },
                { label: 'Practical', value: 'practical' },
                { label: 'Lab', value: 'lab' },
                { label: 'Tutorial', value: 'tutorial' }
            ]
          })
        ]
      },
      {
        containers: [
          new QuestionTextArea({
            key: 'description',
            label: 'Description',
            required: true,
          })
        ]
      }
    ]
  }

  private _getScheduleFormContainer(): FormContainer[] {
    return [
      {
        containers: [
          new QuestionDatePicker({
            key: 'start_date',
            label: 'Start date',
            required: true,
          }),
          new QuestionDatePicker({
            key: 'end_date',
            label: 'End date',
            required: true,
          })
        ]
      },
      {
        containers: [
          new QuestionTimePicker({
            key: 'start_time',
            label: 'Start time',
            required: true,
          }),
          new QuestionTimePicker({
            key: 'end_time',
            label: 'End time',
            required: true,
          })
        ]
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'duration',
            label: 'Duration',
            type: QuestionFieldTypeEnum.Number,
            required: true,
          }),
          new QuestionMultiSelect({
            key: 'days',
            label: 'Class Days',
            required: true,
            options: [
              { label: 'Monday', value: 'monday' },
              { label: 'Tuesday', value: 'tuesday' },
              { label: 'Wednesday', value: 'wednesday' },
              { label: 'Thursday', value: 'thursday' },
              { label: 'Friday', value: 'friday' },
              { label: 'Saturday', value: 'saturday' }
            ]
          }),
          new QuestionSelectInput({
            key: 'room',
            label: 'Room',
            required: true,
            options: []
          })
        ]
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'max_capacity',
            label: 'Max capacity',
            required: true,
            type: QuestionFieldTypeEnum.Number
          }),
          new QuestionTextInput({
            key: 'min_capacity',
            label: 'Min capacity',
            type: QuestionFieldTypeEnum.Number
          }),
          new QuestionTextInput({
            key: 'current_enrollment',
            label: 'Current enrollment',
            type: QuestionFieldTypeEnum.Number
          }),
        ]
      }
    ]
  }
}
