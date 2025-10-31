import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'school-teacher-status-cards',
  imports: [SkeletonModule, CommonModule],
  templateUrl: './teacher-status-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherStatusCardsComponent {
  teacher = input.required<any>()
  loading = input(false)
}
