import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'school-recent-activity',
  imports: [],
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentActivityComponent {
  recentActivities = input.required<any[]>()

}
