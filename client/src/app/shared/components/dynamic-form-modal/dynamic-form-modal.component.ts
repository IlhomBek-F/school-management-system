import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { QuestionControlService } from '@core/services/question-control.service';
import { ButtonDirective } from 'primeng/button';
import {  DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DynamicFormModalDataModel } from '@core/models/dynamic-form-modal-data';
import { FormContainer } from '@core/models/question-base';

@Component({
  selector: 'school-dynamic-modal',
  imports: [DynamicFormComponent, ButtonDirective],
  templateUrl: './dynamic-form-modal.component.html',
  styleUrl: './dynamic-form-modal.component.scss',
  providers: [QuestionControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormModalComponent implements OnInit{
  formContainer = signal<FormContainer[]>([])
  form = computed(() => this._questionControlService.toFormGroup(this.formContainer()));
  loading!: WritableSignal<boolean>

  private _questionControlService = inject(QuestionControlService);
  private _dialogConfig = inject(DynamicDialogConfig<DynamicFormModalDataModel>);

  ngOnInit(): void {
    this.formContainer.set(this._dialogConfig.data.formContainers);
    this.loading = this._dialogConfig.data.loading;
  }

  confirm() {
    console.log(this.form())
    this._dialogConfig.data.footer.onConfirm(this.form().getRawValue())
  }

  cancel() {
    this._dialogConfig.data.footer.onCancel()
  }
}
