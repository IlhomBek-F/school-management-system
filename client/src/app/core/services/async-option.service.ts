import { inject, Injectable } from "@angular/core";
import { AsyncOptionEnum } from "@core/enums/async-option.enum";
import { ResDataWithMeta } from "@core/models/base";
import { SubjectSuccessWithMeta } from "@core/models/subject";
import { map, Observable } from "rxjs";
import { SubjectsService } from "./subjects.service";
import { RoomsService } from "app/features/rooms/services/rooms.service";
import { TeachersService } from "app/features/teachers/services/teachers.service";
import { ClassesService } from "app/features/classes/services/classes.services";

@Injectable({ providedIn: "root" })
export class AsyncOptionsService {
  private _subjectsService = inject(SubjectsService)
  private _roomsService = inject(RoomsService)
  private _teachersService = inject(TeachersService)
  private _classesService = inject(ClassesService)

  private _serviceMap = new Map<AsyncOptionEnum, Observable<any>>([
    [AsyncOptionEnum.SUBJECTS, this._subjectsService.retrieveAll<SubjectSuccessWithMeta>()],
    [AsyncOptionEnum.FACILITIES, this._roomsService.getFacilities()],
    [AsyncOptionEnum.ROOM_TYPES, this._roomsService.getRoomTypes()],
    [AsyncOptionEnum.BUILDINGS, this._roomsService.getBuildings()],
    [AsyncOptionEnum.TEACHERS, this._teachersService.retrieveAll()],
    [AsyncOptionEnum.CLASS_TYPES, this._classesService.getClassTypes()],
    [AsyncOptionEnum.ROOMS, this._roomsService.retrieveAll()],
  ])

  getAsyncOptionsRequest(asyncType: AsyncOptionEnum): Observable<any> {
    if (!this._serviceMap.has(asyncType)) {
      throw new Error(`Unknown AsyncOptionEnum: ${asyncType}`);
    }

    return (this._serviceMap.get(asyncType) as Observable<any>).pipe(this._pickData());
  }

  private _pickData<T>() {
    return map((res: ResDataWithMeta<T>) => res.data)
  }
}
