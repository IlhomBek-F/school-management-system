import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { QuickStatsComponent } from "../quick-stats/quick-stats.component";
import { SkeletonModule } from "primeng/skeleton";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'school-class-view-detail-header',
  imports: [ButtonModule, QuickStatsComponent, SkeletonModule, CommonModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassViewDetailHeaderComponent {
  loading = input(false)
}
