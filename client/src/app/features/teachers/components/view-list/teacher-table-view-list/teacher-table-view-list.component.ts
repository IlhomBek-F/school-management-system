import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TableModule } from "primeng/table";
import { Tag } from "primeng/tag";
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { RandomBgColorPipe } from '@core/pipes/random-bg-color-pipe';
import { Teacher } from 'app/features/teachers/models';
import { DEPARTMENTS_MAP } from 'app/utils/constants';

@Component({
  selector: 'school-teacher-table-view-list',
  imports: [TableModule, Tag, Button, CommonModule, RandomBgColorPipe],
  templateUrl: './teacher-table-view-list.component.html',
  styleUrl: './teacher-table-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherTableViewListComponent {
  teacherList = input.required<Teacher[]>()
  viewDetailEmitEvent = output<any>()
  deleteEmitEvent = output<any>()
  DEPARTMENT_MAP = DEPARTMENTS_MAP;

  viewProfile(teacher: any): void {
    this.viewDetailEmitEvent.emit(teacher)
  }

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

  deleteRecord(teacher: any) {
    this.deleteEmitEvent.emit(teacher)
  }
}
