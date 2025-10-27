import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

@Component({
  selector: 'school-classes-table-view-list',
  imports: [TagModule, ButtonModule, TableModule],
  templateUrl: './classes-table-view-list.component.html',
  styleUrl: './classes-table-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesTableViewListComponent {
  classesList = input.required<any[]>()

   addClass(): void {
    console.log('Add class clicked');
  }

  viewDetails(cls: any): void {
    console.log('View details:', cls);
  }

  editClass(cls: any): void {
    console.log('Edit class:', cls);
  }

  getStatusSeverity(status: string): string {
    switch(status) {
      case 'Active': return 'success';
      case 'Cancelled': return 'danger';
      default: return 'info';
    }
  }

  getCapacityPercentage(students: number, capacity: number): number {
    return Math.round((students / capacity) * 100);
  }

  getCapacitySeverity(percentage: number): string {
    if (percentage >= 90) return 'danger';
    if (percentage >= 70) return 'warning';
    return 'success';
  }
}
