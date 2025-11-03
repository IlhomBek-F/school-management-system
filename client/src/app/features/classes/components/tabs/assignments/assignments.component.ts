import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

@Component({
  selector: 'school-assignments',
  imports: [BadgeModule, ButtonModule, TableModule],
  templateUrl: './assignments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentsComponent {
  assignments = input.required<any[]>()

  onCreateAssignment(): void {
    console.log('Create assignment clicked');
  }

  onEditAssignment(assignment: any): void {
    console.log('Edit assignment:', assignment);
  }

  onViewAssignment(assignment: any): void {
    console.log('View assignment:', assignment);
  }

   getStatusSeverity(status: string): any {
    const statusMap: { [key: string]: string } = {
      'Completed': 'success',
      'In Progress': 'warning',
      'Upcoming': 'info'
    };
    return statusMap[status] || 'info';
  }
}
