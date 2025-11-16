import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";
import { RoomsGridViewSkeletonComponent } from "../rooms-grid-view-skeleton/rooms-grid-view-skeleton.component";
import { Room } from '../../models';
import { RoomTypeIconPipe } from '../../pipes/room-type-icon-pipe';
import { RoomStatus } from '../../enums';
import { StatusSeverityPipe } from '../../pipes/status-severity-pipe';
import { RandomBgColorPipe } from '@core/pipes/random-bg-color-pipe';

@Component({
  selector: 'school-rooms-grid-view-list',
  imports: [ButtonModule, TagModule, CommonModule, RoomsGridViewSkeletonComponent, RoomTypeIconPipe, StatusSeverityPipe, RandomBgColorPipe],
  templateUrl: './rooms-grid-view-list.component.html',
  styleUrl: './rooms-grid-view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsGridViewListComponent {
  readonly STATUS = RoomStatus;
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
