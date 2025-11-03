import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'school-dashboard-stats-cards',
  imports: [SkeletonModule],
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStatsCardsComponent {
  statCards = input.required<any[]>();
  loading = input(false)
}
