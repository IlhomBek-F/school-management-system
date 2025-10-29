import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TabsModule } from "primeng/tabs";
import { DynamicFormComponent } from "@shared/components/dynamic-form/dynamic-form.component";
import { FormGroup } from '@angular/forms';
import { FormContainer } from '@core/models/form-container';
import { QuestionControlService } from '@core/services/question-control.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { QuestionTextInput } from '@core/dynamic-form/question-text-input';
import { QuestionSelectInput } from '@core/dynamic-form/question-select-input';
import { QuestionTextArea } from '@core/dynamic-form/question-textarea';
import { QuestionDatePicker } from '@core/dynamic-form/question-datepicker';
import { QuestionTimePicker } from '@core/dynamic-form/question-time-picker';
import { QuestionFieldTypeEnum } from '@core/enums/question-type.enum';
import { ButtonModule } from 'primeng/button';

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

    if (this._dialogConfig.data.teacher) {
      this.form.patchValue(this._dialogConfig.data.teacher)
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
      {
        title: 'Capacity Information',
        value: 'capacity_info',
        formContainers: []
      }
    ];

    this.form = this._questionControlService.toFormGroup(this.tabItems.flatMap(t => t.formContainers))
  }

  private _getBasicFormContainer(): FormContainer[] {
    return [
      {
        containers: [
          new QuestionTextInput({
            key: 'class_name',
            label: 'Classname'
          }),
          new QuestionTextInput({
            key: 'class_code',
            label: 'Class code'
          })
        ]
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'subject',
            label: 'Subject',
            options: []
          }),
          new QuestionSelectInput({
            key: 'teacher',
            label: 'Teacher',
            options: []
          })
        ],
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'grade',
            label: 'Grade',
            options: []
          }),
          new QuestionSelectInput({
            key: 'section',
            label: 'Section',
            options: []
          }),
          new QuestionSelectInput({
            key: 'class_type',
            label: 'Class type',
            options: []
          })
        ]
      },
      {
        containers: [
          new QuestionTextArea({
            key: 'description',
            label: 'Description'
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
            label: 'Start date'
          }),
          new QuestionDatePicker({
            key: 'end_date',
            label: 'End date'
          })
        ]
      },
      {
        containers: [
          new QuestionTimePicker({
            key: 'start_time',
            label: 'Start time'
          }),
          new QuestionTimePicker({
            key: 'end_time',
            label: 'End time',
          })
        ]
      },
      {
        containers: [
          new QuestionTextInput({
            key: 'duration',
            label: 'Duration',
            type: QuestionFieldTypeEnum.Number,
          }),
          new QuestionSelectInput({
            key: 'room',
            label: 'Room',
            options: []
          })
        ]
      }
    ]
  }
}
