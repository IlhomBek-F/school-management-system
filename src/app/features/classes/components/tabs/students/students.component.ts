import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProgressBarModule } from "primeng/progressbar";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

@Component({
  selector: 'school-students',
  imports: [ProgressBarModule, ButtonModule, TableModule],
  templateUrl: './students.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent {
  students = input.required<any>()

  onViewProfile(student: any): void {
    console.log('View profile:', student);
  }

  onSendMessage(student: any): void {
    console.log('Send message to:', student);
  }

  getGradeColor(grade: string): string {
    const gradeColors: { [key: string]: string } = {
      'A': 'text-green-600',
      'A-': 'text-green-500',
      'B+': 'text-blue-600',
      'B': 'text-blue-500'
    };
    return gradeColors[grade] || 'text-gray-600';
  }
}
