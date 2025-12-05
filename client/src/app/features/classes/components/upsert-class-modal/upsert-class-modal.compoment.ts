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
import { TabItem } from '@core/models/base';
import { OptionTypeEnum } from '@core/enums/option-type.enum';
import { AsyncOptionEnum } from '@core/enums/async-option.enum';
import { GRADES } from 'app/utils/constants';

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
  tabItems!: TabItem[];

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
    const basicFormContainer = this._getBasicFormContainer();
    const scheduleFormContainer = this._getScheduleFormContainer();

    this.tabItems = [
      {
        title: 'Basic Information',
        value: 'basic_info',
        formContainers: basicFormContainer,
        form: this._questionControlService.toFormGroup(basicFormContainer)
      },
      {
        title: 'Schedule Information',
        value: 'schedule_info',
        formContainers: scheduleFormContainer,
        form: this._questionControlService.toFormGroup(scheduleFormContainer)
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
            key: 'class_code',
            label: 'Class code',
            required: true,
          })
        ]
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'subject_id',
            label: 'Subject',
            required: true,
            optionValue: "id",
            optionLabel: "name",
            optionType: OptionTypeEnum.ASYNC,
            asyncOptionType: AsyncOptionEnum.SUBJECTS,
          }),
          new QuestionSelectInput({
            key: 'teacher_id',
            label: 'Teacher',
            required: true,
            optionValue: "id",
            optionLabel: "personal_info.full_name",
            optionType: OptionTypeEnum.ASYNC,
            asyncOptionType: AsyncOptionEnum.TEACHERS
          })
        ],
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'grade_id',
            label: 'Grade',
            required: true,
            options: GRADES,
          }),
          new QuestionSelectInput({
            key: 'section_id',
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
            key: 'class_type_id',
            label: 'Class type',
            required: true,
            options: []
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
            key: 'room_id',
            label: 'Room',
            required: true,
            optionValue: "id",
            optionLabel: "name",
            optionType: OptionTypeEnum.ASYNC,
            asyncOptionType: AsyncOptionEnum.ROOMS,
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
