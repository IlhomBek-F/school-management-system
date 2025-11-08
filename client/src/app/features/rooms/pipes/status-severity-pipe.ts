import { Pipe, type PipeTransform } from '@angular/core';
import { RoomStatus } from '../enums';
import { StatusSeverityEnum } from '@core/enums/status-severity.enum';

@Pipe({
  name: 'schoolStatusSeverity',
})
export class StatusSeverityPipe implements PipeTransform {

  transform(status: RoomStatus): string {
    switch(status) {
      case RoomStatus.AVAILABLE: return StatusSeverityEnum.SUCCESS;
      case RoomStatus.OCCUPIED: return StatusSeverityEnum.WARNING;
      case RoomStatus.MAINTENANCE: return StatusSeverityEnum.DANGER;
      default: return StatusSeverityEnum.INFO;
    }
  }

}
