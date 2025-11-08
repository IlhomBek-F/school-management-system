import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { CommonModule } from '@angular/common';
import { Room } from '../../models';
import { RoomTypeIconPipe } from '../../pipes/room-type-icon-pipe';
import { StatusSeverityPipe } from '../../pipes/status-severity-pipe';

@Component({
  selector: 'school-rooms-table-view-list',
  imports: [TableModule, TagModule, ButtonModule, CommonModule, RoomTypeIconPipe, StatusSeverityPipe],
  templateUrl: './rooms-table-view-list.component.html',
  styleUrl: './rooms-table-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsTableViewListComponent {
  rooms = input.required<Room[]>()
  viewDetailEmitEvent = output<Room>()
  deleteEmitEvent = output<Room>()
  editEmitEvent = output<Room>()

  viewDetails(room: Room) {
   this.viewDetailEmitEvent.emit(room)
  }

  editRoom(room: Room) {
    this.editEmitEvent.emit(room)
  }

  deleteRoom(room: Room): void {
    this.deleteEmitEvent.emit(room)
  }

  getStatusSeverity(status: string): string {
    switch(status) {
      case 'Available': return 'success';
      case 'Occupied': return 'warning';
      case 'Maintenance': return 'danger';
      default: return 'info';
    }
  }

  getOccupancyPercentage(current: number, capacity: number): number {
    return Math.round((current / capacity) * 100);
  }

  getOccupancySeverity(percentage: number): string {
    if (percentage === 0) return 'success';
    if (percentage >= 90) return 'danger';
    if (percentage >= 70) return 'warning';
    return 'info';
  }
}
