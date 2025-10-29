import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'school-activity',
  imports: [],
  templateUrl: './activity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent {
  activityLogs = input.required<any>()
}
