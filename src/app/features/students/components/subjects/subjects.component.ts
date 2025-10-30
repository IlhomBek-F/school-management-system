import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'school-subjects',
  imports: [CommonModule],
  templateUrl: './subjects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectsComponent {
  subjects = input.required<any>()
}
