import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'school-top-students',
  imports: [CommonModule],
  templateUrl: './top-students.component.html',
  styleUrl: './top-students.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopStudentsComponent {
  students = input.required<any[]>()
}
