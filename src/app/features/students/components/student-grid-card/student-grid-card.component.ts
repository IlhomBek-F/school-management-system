import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Tag } from "primeng/tag";
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'school-student-grid-card',
  imports: [Tag, Button, CommonModule],
  templateUrl: './student-grid-card.component.html',
  styleUrl: './student-grid-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentGridCardComponent {
  student = input.required<any>();

   viewProfile(student: any): void {
    // Implement view profile logic
    console.log('View profile:', student);
  }
}
