import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { QuestionBase } from '../../../core/dynamic-form/question-base';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionControlService } from '../../../core/services/question-control.service';
import { DynamicFormFieldComponent } from "./dynamic-form-field/dynamic-form-field.component";
import { ButtonDirective, ButtonModule } from "primeng/button";

@Component({
  selector: 'school-dynamic-form',
  imports: [ReactiveFormsModule, DynamicFormFieldComponent, ButtonDirective, ButtonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
private readonly qcs = inject(QuestionControlService);
  readonly questions = input<QuestionBase<string>[] | null>([]);
  readonly form = computed<FormGroup>(() =>
    this.qcs.toFormGroup(this.questions() as QuestionBase<string>[]),
  );

  onSubmit() {
    console.log(this.form().getRawValue())
  }
}
