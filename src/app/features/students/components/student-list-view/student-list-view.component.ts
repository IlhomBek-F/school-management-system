import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'school-student-list-view',
  imports: [TableModule, ButtonModule],
  templateUrl: './student-list-view.component.html',
  styleUrl: './student-list-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentListViewComponent {
  studentList = input.required<any>()

  viewProfile(student: any): void {
    // Implement view profile logic
    console.log('View profile:', student);
  }
}
