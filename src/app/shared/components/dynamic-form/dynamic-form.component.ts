import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';
import { ButtonModule } from 'primeng/button';
import { FormContainer } from '../../../core/models/form-container';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'school-dynamic-form',
  imports: [
    ReactiveFormsModule,
    DynamicFormFieldComponent,
    ButtonModule,
    CommonModule,
  ],
  template: `
    <form [formGroup]="form()">
      <div class="space-y-2 w-full">
        @for (container of formContainer(); track container) {
        <div class="grid gap-4 w-full" [ngStyle]="{'grid-template-columns': 'repeat(' + container.containers.length + ', minmax(0, 1fr))'}">
          @for (question of container.containers; track question) {
            <school-dynamic-form-field [question]="question" [form]="form()" />
          }
        </div>
        }
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
  readonly formContainer = input<FormContainer[]>([]);
  readonly form = input.required<FormGroup>();
}
