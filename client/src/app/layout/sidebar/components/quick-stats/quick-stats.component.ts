import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { QuickStats } from '@core/models/stats';
import { StatsService } from '@core/services/stats.service';
import { ToastService } from '@core/services/toast.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SkeletonModule } from "primeng/skeleton";
import { finalize } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'school-sidebar-quick-stats',
  imports: [SkeletonModule, CommonModule],
  templateUrl: './quick-stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickStatsComponent  implements OnInit{
  private _statsService = inject(StatsService)
  private _messageService = inject(ToastService)

  stats = signal<QuickStats>({
    classes: 0,
    students: 0
  })

  loading = signal(true)

  ngOnInit(): void {
    this._statsService.getQuickStats()
    .pipe(
      finalize(() => this.loading.set(false)),
      untilDestroyed(this)
    ).subscribe({next: ({data: {students, classes}}) => {
       this.stats.set({students, classes})
    }, error: (err) => {
       this._messageService.error(err.message || "Failed getting quick stats")
    }})
  }
}
