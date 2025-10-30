import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Tag } from "primeng/tag";
import { Button } from "primeng/button";

@Component({
  selector: 'school-teacher-grid-view-list',
  imports: [Tag, Button],
  templateUrl: './teacher-grid-view-list.component.html',
  styleUrl: './teacher-grid-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherGridViewListComponent {
  teachers = input.required<any[]>()
  viewDetailEmitEvent = output<any>()

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
}
