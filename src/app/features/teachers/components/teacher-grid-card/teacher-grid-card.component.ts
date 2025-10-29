import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Tag } from "primeng/tag";
import { Button } from "primeng/button";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'school-teacher-grid-card',
  imports: [Tag, Button],
  templateUrl: './teacher-grid-card.component.html',
  styleUrl: './teacher-grid-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherGridCardComponent {
  teacher = input.required<any>()

  private _router = inject(Router)
  private _activateRoute = inject(ActivatedRoute)

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
    this._router.navigate([teacher.id], {relativeTo: this._activateRoute})
    console.log('View profile:', teacher);
  }
}
