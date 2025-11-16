import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Tag } from "primeng/tag";
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { SkeletonModule } from "primeng/skeleton";
import { Student } from 'app/features/students/models';
import { RandomBgColorPipe } from '@core/pipes/random-bg-color-pipe';

@Component({
  selector: 'school-student-grid-view-list',
  imports: [Tag, Button, CommonModule, SkeletonModule, RandomBgColorPipe],
  templateUrl: './student-grid-view-list.component.html',
  styleUrl: './student-grid-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentGridViewListComponent {
  students = input.required<Student[]>();
  viewDetailEmitEvent = output<Student>()
  deleteEventEmit = output<Student>()
  loading = input(false);

  viewProfile(student: Student): void {
     this.viewDetailEmitEvent.emit(student)
  }

  deleteStudent(student: Student): void {
     this.deleteEventEmit.emit(student)
  }
}
