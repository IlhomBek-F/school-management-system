import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChartModule } from "primeng/chart";

@Component({
  selector: 'school-students',
  imports: [ChartModule],
  templateUrl: './students.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent {
  topStudents = input.required<any>()
  studentProgressChartData = input.required<any>()
  studentProgressChartOptions = input.required<any>()
}
