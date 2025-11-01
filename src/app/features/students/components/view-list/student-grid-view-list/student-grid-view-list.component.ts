import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Tag } from "primeng/tag";
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'school-student-grid-view-list',
  imports: [Tag, Button, CommonModule, SkeletonModule],
  templateUrl: './student-grid-view-list.component.html',
  styleUrl: './student-grid-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentGridViewListComponent {
  students = input.required<any[]>();
  viewDetailEmitEvent = output<any>()
  deleteEventEmit = output<any>()
  loading = input(false);

  viewProfile(student: any): void {
     this.viewDetailEmitEvent.emit(student)
  }

  deleteStudent(student: any): void {
     this.deleteEventEmit.emit(student)
  }
}
