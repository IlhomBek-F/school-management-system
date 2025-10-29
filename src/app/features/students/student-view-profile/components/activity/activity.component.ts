import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'school-activity',
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent {
  activityLogs = input.required<any>()
}
