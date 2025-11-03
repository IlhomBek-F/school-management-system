import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'school-sidebar-quick-stats',
  imports: [SkeletonModule, CommonModule],
  templateUrl: './quick-stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickStatsComponent  implements OnInit{
  loading = signal(true)

  ngOnInit(): void {
    setTimeout(() => this.loading.set(false), 3000)
  }
}
