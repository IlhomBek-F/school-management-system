import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'school-recent-activity',
  imports: [SkeletonModule],
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentActivityComponent {
  recentActivities = input.required<any[]>()
  loading = input(false)
}
