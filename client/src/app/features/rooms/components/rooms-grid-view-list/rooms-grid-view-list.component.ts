import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";
import { RoomsGridViewSkeletonComponent } from "../rooms-grid-view-skeleton/rooms-grid-view-skeleton.component";
import { Room } from '../../models';

@Component({
  selector: 'school-rooms-grid-view-list',
  imports: [ButtonModule, TagModule, CommonModule, RoomsGridViewSkeletonComponent],
  templateUrl: './rooms-grid-view-list.component.html',
  styleUrl: './rooms-grid-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsGridViewListComponent {
  rooms = input.required<Room[]>()
  viewDetailEmitEvent = output<Room>()
  deleteEmitEvent = output<Room>()
  editEmitEvent = output<Room>()
  loading = input(false)

  viewDetails(room: any) {
   this.viewDetailEmitEvent.emit(room)
  }

  editRoom(room: any) {
    this.editEmitEvent.emit(room)
  }

  deleteRoom(room: any) {
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
