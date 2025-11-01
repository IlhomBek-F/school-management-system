import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
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
  editEmitEvent = output<any>()
  viewDetailEmitEvent = output<any>()
  deleteEmitEvent = output<any>()

  viewDetails(cls: any): void {
    this.viewDetailEmitEvent.emit(cls)
  }

  editClass(classObj: any): void {
    this.editEmitEvent.emit(classObj)
  }

  deleteClass(classObj: any): void {
    this.deleteEmitEvent.emit(classObj)
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
