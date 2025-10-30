import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'school-rooms-table-view-list',
  imports: [TableModule, TagModule, ButtonModule, CommonModule],
  templateUrl: './rooms-table-view-list.component.html',
  styleUrl: './rooms-table-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsTableViewListComponent {
  rooms = input.required<any[]>()
  viewDetailEmitEvent = output<any>()
  editEmitEvent = output<any>()

  viewDetails(room: any) {
   this.viewDetailEmitEvent.emit(room)
  }

  editRoom(room: any) {
    this.editEmitEvent.emit(room)
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

  getRoomTypeIcon(type: string): string {
    switch(type) {
      case 'Classroom': return 'pi-book';
      case 'Laboratory': return 'pi-flask';
      case 'Computer Lab': return 'pi-desktop';
      case 'Auditorium': return 'pi-users';
      case 'Library': return 'pi-bookmark';
      case 'Sports': return 'pi-star';
      case 'Studio': return 'pi-palette';
      default: return 'pi-building';
    }
  }
}
