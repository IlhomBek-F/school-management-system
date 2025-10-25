import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'school-stats-card',
  templateUrl: './stats-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class SchoolStatsCardComponent {
  title = input.required()
  value = input.required()
  icon = input.required()

  rootClassName = input<string>()
  titleClassName = input<string>()
  valueClassName = input<string>()
  iconWrapperClassName = input<string>()
}
