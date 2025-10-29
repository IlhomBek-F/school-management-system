import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Tag } from "primeng/tag";
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'school-student-grid-card',
  imports: [Tag, Button, CommonModule],
  templateUrl: './student-grid-card.component.html',
  styleUrl: './student-grid-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentGridCardComponent {
  student = input.required<any>();

  private _router = inject(Router)
  private _activeRoute = inject(ActivatedRoute)

   viewProfile(student: any): void {
     this._router.navigate([student.id], {relativeTo: this._activeRoute})
  }
}
