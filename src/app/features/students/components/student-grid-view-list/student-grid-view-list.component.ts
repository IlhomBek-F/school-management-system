import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Tag } from "primeng/tag";
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'school-student-grid-view-list',
  imports: [Tag, Button, CommonModule],
  templateUrl: './student-grid-view-list.component.html',
  styleUrl: './student-grid-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentGridViewListComponent {
  students = input.required<any[]>();
  viewDetailEmitEvent = output<any>()

   viewProfile(student: any): void {
     this.viewDetailEmitEvent.emit(student)
  }
}
