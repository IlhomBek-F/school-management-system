import { Pipe, type PipeTransform } from '@angular/core';

const ROOM_TYPE_ICON: Record<string, string> = {
  'Classroom': 'pi-book',
  'Laboratory': 'pi-flask',
  'Computer Lab': 'pi-desktop',
  'Auditorium': 'pi-users',
  'Library': 'pi-bookmark',
  'Sports': 'pi-star',
  'Studio': 'pi-palette'
}

@Pipe({
  name: 'schoolRoomTypeIcon',
})
export class RoomTypeIconPipe implements PipeTransform {

  transform(value: string): string {
    if (ROOM_TYPE_ICON[value]) {
      return ROOM_TYPE_ICON[value]
    }

    return 'pi-building'
  }
}
