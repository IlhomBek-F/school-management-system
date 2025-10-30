import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { TagModule } from "primeng/tag";
import { Button } from "primeng/button";
import { DialogService } from 'primeng/dynamicdialog';
import { UpsertClassModalCompoment } from '../upsert-class-modal/upsert-class-modal.compoment';

@Component({
  selector: 'school-classes-grid-view-list',
  imports: [TagModule, CommonModule, Button],
  templateUrl: './classes-grid-view-list.component.html',
  styleUrl: './classes-grid-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesGridViewListComponent {
  classList = input.required<any>()
  editEmitEvent = output<any>()
  viewDetailEmitEvent = output<any>()

   addClass(): void {
    console.log('Add class clicked');
  }

  viewDetails(cls: any): void {
    this.viewDetailEmitEvent.emit(cls)
  }

  editClass(classObj: any): void {
    this.editEmitEvent.emit(classObj)
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
