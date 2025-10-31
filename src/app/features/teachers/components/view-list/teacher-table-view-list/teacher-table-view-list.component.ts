import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TableModule } from "primeng/table";
import { Tag } from "primeng/tag";
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'school-teacher-table-view-list',
  imports: [TableModule, Tag, Button, CommonModule],
  templateUrl: './teacher-table-view-list.component.html',
  styleUrl: './teacher-table-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherTableViewListComponent {
  teacherList = input.required<any[]>()
  viewDetailEmitEvent = output<any>()

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
}
