import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { Student } from 'app/features/students/models';
import { RandomBgColorPipe } from '@core/pipes/random-bg-color-pipe';

@Component({
  selector: 'school-student-table-view-list',
  imports: [TableModule, ButtonModule, RandomBgColorPipe],
  templateUrl: './student-table-view-list.component.html',
  styleUrl: './student-table-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentTableViewListComponent {
  studentList = input.required<Student[]>()
  viewDetailEmitEvent = output<Student>()
  deleteEventEmit = output<Student>()

  viewProfile(student: Student): void {
    this.viewDetailEmitEvent.emit(student)
  }

  deleteStudent(student: Student) {
    this.deleteEventEmit.emit(student)
  }
}
