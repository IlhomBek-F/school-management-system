import { Injectable } from "@angular/core";
import { BuildingSuccessWithMeta } from "@core/models/building";
import { FacilitySuccessWithMeta } from "@core/models/facility";
import { RoomTypesSuccessWithMeta } from "@core/models/room-types";
import { BaseService } from "@core/services/base.service";
import { Observable } from "rxjs";

@Injectable()
export class RoomsService extends BaseService {
  private _url = `${this.baseUrl}/rooms`

  getRoomTypes(): Observable<RoomTypesSuccessWithMeta> {
    return this.http.get<RoomTypesSuccessWithMeta>(`${this.baseUrl}/room_type/list`)
  }

  getBuildings(): Observable<BuildingSuccessWithMeta> {
    return this.http.get<BuildingSuccessWithMeta>(`${this.baseUrl}/building/list`)
  }

  getFacilities(): Observable<FacilitySuccessWithMeta> {
    return this.http.get<FacilitySuccessWithMeta>(`${this.baseUrl}/facility/list`)
  }
}