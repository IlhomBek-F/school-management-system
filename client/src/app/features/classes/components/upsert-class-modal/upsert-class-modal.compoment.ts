import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TabsModule } from "primeng/tabs";
import { QuestionControlService } from '@core/services/question-control.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { QuestionTextInput, QuestionSelectInput, QuestionTextArea, QuestionDatePicker, QuestionTimePicker, QuestionMultiSelect, FormContainer } from '@ilhombek/base-form';
import { QuestionFieldTypeEnum } from '@core/enums/question-type.enum';
import { ButtonModule } from 'primeng/button';
import { TabItem } from '@core/models/base';
import { OptionTypeEnum } from '@core/enums/option-type.enum';
import { CLASS_SECTION_TYPES, CLASS_SECTIONS, GRADES } from 'app/utils/constants';
import { BasicInfoFields, ClassModel, ScheduleInfo } from '../../models';
import { FormTabsComponent } from "@shared/components/form-tabs/form-tabs.component";
import { AsyncOptionsService } from '@core/services/async-option.service';
import { AsyncOptionEnum } from '@core/enums/async-option.enum';

@Component({
  selector: 'school-upsert-class-modal',
  imports: [TabsModule, ButtonModule, FormTabsComponent],
  templateUrl: './upsert-class-modal.compoment.html',
  styleUrl: './upsert-class-modal.compoment.scss',
  providers: [QuestionControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertClassModalCompoment {
  tabItems!: TabItem[];
  loading = signal<boolean>(false);

  private _questionControlService = inject(QuestionControlService)
  private _dialogConfig = inject(DynamicDialogConfig)
  private _asyncOptionService = inject(AsyncOptionsService)

  ngOnInit(): void {
    this._createTabItems()
    this.loading = this._dialogConfig.data.loading;
  }

  confirm() {
    const formValue = this.tabItems.reduce((acc: Record<string, any>, item: TabItem) => {
       acc[item.value] = item.form.getRawValue();
       return acc;
    }, {})

    this._dialogConfig.data.footer.onConfirm(formValue);
  }

  cancel() {
    this._dialogConfig.data.footer.onCancel();
  }

  private _createTabItems() {
    const {basic_info, schedule_info} = this._dialogConfig.data.class || {basic_info: {}, schedule_info: {}} as ClassModel

    const basicFormContainer = this._getBasicFormContainer(basic_info);
    const scheduleFormContainer = this._getScheduleFormContainer(schedule_info);

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
  }

  private _getBasicFormContainer(basic_info: BasicInfoFields): FormContainer[] {

    return [
      {
        containers: [
          new QuestionTextInput({
            key: 'name',
            label: 'Classname',
            required: true,
            value: basic_info.name
          }),
          new QuestionTextInput({
            key: 'code',
            label: 'Class code',
            required: true,
            value: basic_info.code
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
            value: basic_info.subject_id,
            optionType: OptionTypeEnum.ASYNC,
            asyncOptionObs$: this._asyncOptionService.getAsyncOptionsRequest(AsyncOptionEnum.SUBJECTS),
          }),
          new QuestionSelectInput({
            key: 'teacher_id',
            label: 'Teacher',
            required: true,
            optionValue: "id",
            value: basic_info.teacher_id,
            optionLabel: "personal_info.full_name",
            optionType: OptionTypeEnum.ASYNC,
            asyncOptionObs$: this._asyncOptionService.getAsyncOptionsRequest(AsyncOptionEnum.TEACHERS),
          })
        ],
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'grade_id',
            label: 'Grade',
            required: true,
            value: basic_info.grade_id,
            options: GRADES,
          }),
          new QuestionSelectInput({
            key: 'section_id',
            label: 'Section',
            required: true,
            value: basic_info.section_id,
            options: CLASS_SECTIONS
          }),
          new QuestionSelectInput({
            key: 'class_type_id',
            label: 'Class type',
            required: true,
            value: basic_info.class_type_id,
            options: CLASS_SECTION_TYPES
          })
        ]
      },
      {
        containers: [
          new QuestionTextArea({
            key: 'description',
            label: 'Description',
            value: basic_info.description,
            required: true,
          })
        ]
      }
    ]
  }

  private _getScheduleFormContainer(schedule_info: ScheduleInfo): FormContainer[] {
    return [
      {
        containers: [
          new QuestionDatePicker({
            key: 'start_date',
            label: 'Start date',
            required: true,
            value: schedule_info.start_date
          }),
          new QuestionDatePicker({
            key: 'end_date',
            label: 'End date',
            required: true,
            value: schedule_info.end_date
          })
        ]
      },
      {
        containers: [
          new QuestionTimePicker({
            key: 'start_time',
            label: 'Start time',
            required: true,
            value: schedule_info.start_time
          }),
          new QuestionTimePicker({
            key: 'end_time',
            label: 'End time',
            required: true,
            value: schedule_info.end_time
          })
        ]
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'duration',
            label: 'Duration',
            type: QuestionFieldTypeEnum.Number,
            value: schedule_info.duration,
            required: true,
          }),
          new QuestionMultiSelect({
            key: 'class_days_ids',
            label: 'Class Days',
            required: true,
            value: schedule_info.class_days_ids?.map((value) => ({value})),
            options: [
              { label: 'Monday', value: 0 },
              { label: 'Tuesday', value: 1 },
              { label: 'Wednesday', value: 2 },
              { label: 'Thursday', value: 3 },
              { label: 'Friday', value: 4 },
              { label: 'Saturday', value: 5 }
            ]
          }),
          new QuestionSelectInput({
            key: 'room_id',
            label: 'Room',
            required: true,
            optionValue: "id",
            optionLabel: "name",
            value: schedule_info.room_id,
            optionType: OptionTypeEnum.ASYNC,
            asyncOptionObs$: this._asyncOptionService.getAsyncOptionsRequest(AsyncOptionEnum.ROOMS),
          })
        ]
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'max_capacity',
            label: 'Max capacity',
            value: schedule_info.max_capacity,
            required: true,
            type: QuestionFieldTypeEnum.Number
          }),
          new QuestionTextInput({
            key: 'min_capacity',
            label: 'Min capacity',
            value: schedule_info.min_capacity,
            type: QuestionFieldTypeEnum.Number
          }),
          new QuestionTextInput({
            key: 'current_enrollments',
            label: 'Current enrollment',
            value: schedule_info.curr_enrollment,
            type: QuestionFieldTypeEnum.Number
          }),
        ]
      }
    ]
  }
}
