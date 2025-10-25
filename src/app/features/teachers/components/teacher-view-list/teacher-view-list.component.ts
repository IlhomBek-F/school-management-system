import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableModule } from "primeng/table";
import { Tag } from "primeng/tag";
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'school-teacher-view-list',
  imports: [TableModule, Tag, Button, CommonModule],
  templateUrl: './teacher-view-list.component.html',
  styleUrl: './teacher-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherViewListComponent {
  teacherList = input.required<any[]>()

  viewProfile(teacher: any): void {
    console.log('View profile:', teacher);
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
