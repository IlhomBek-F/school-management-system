import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {  TagModule } from "primeng/tag";

@Component({
  selector: 'school-upcoming-events',
  imports: [TagModule],
  templateUrl: './upcoming-events.component.html',
  styleUrl: './upcoming-events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpcomingEventsComponent {
  upcomingEvents = input.required<any[]>()
}
