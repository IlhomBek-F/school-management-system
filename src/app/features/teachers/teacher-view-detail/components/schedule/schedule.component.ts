import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'school-schedule',
  imports: [],
  templateUrl: './schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent {
  weekSchedule = input.required<any>()
}
