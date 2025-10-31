import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'school-student-view-detail-status-cards',
  imports: [SkeletonModule, CommonModule],
  templateUrl: './student-view-detail-status-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentViewDetailStatusCardsComponent {
  student = input.required<any>()
  loading = input(false)
}
