import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Tag } from "primeng/tag";
import { Button } from "primeng/button";
import { SkeletonModule } from "primeng/skeleton";
import { CommonModule } from '@angular/common';
import { DeleteConfirmDialogService } from '@core/services/delete-confirm-dialog.service';
import { of, timeout } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Teacher } from 'app/features/teachers/models';
import { DEPARTMENTS_MAP } from 'app/utils/constants';
import { RandomBgColorPipe } from '@core/pipes/random-bg-color-pipe';

@Component({
  selector: 'school-teacher-grid-view-list',
  imports: [Tag, Button, SkeletonModule, CommonModule, RandomBgColorPipe],
  templateUrl: './teacher-grid-view-list.component.html',
  styleUrl: './teacher-grid-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherGridViewListComponent {
  loading = input(false)
  teachers = input.required<Teacher[]>()
  viewDetailEmitEvent = output<any>()
  deleteEmitEvent = output<any>()
  DEPARTMENTS_MAP = DEPARTMENTS_MAP;

  getRatingStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    if (hasHalfStar) {
      stars.push('half');
    }
    while (stars.length < 5) {
      stars.push('empty');
    }
    return stars;
  }

  viewProfile(teacher: any): void {
    this.viewDetailEmitEvent.emit(teacher)
  }

  deleteRecord(teacher: any) {
    this.deleteEmitEvent.emit(teacher)
  }
}
