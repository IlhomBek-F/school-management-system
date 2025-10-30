import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'school-student-table-view-list',
  imports: [TableModule, ButtonModule],
  templateUrl: './student-table-view-list.component.html',
  styleUrl: './student-table-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentTableViewListComponent {
  studentList = input.required<any>()
  viewDetailEmitEvent = output<any>()

  viewProfile(student: any): void {
    this.viewDetailEmitEvent.emit(student)
  }
}
