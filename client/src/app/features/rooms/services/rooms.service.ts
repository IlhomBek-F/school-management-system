import { Injectable } from "@angular/core";
import { BuildingSuccessWithMeta } from "@core/models/building";
import { FacilitySuccessWithMeta } from "@core/models/facility";
import { RoomTypesSuccessWithMeta } from "@core/models/room-types";
import { BaseService } from "@core/services/base.service";
import { Observable } from "rxjs";

@Injectable()
export class RoomsService extends BaseService {
  override baseUrl = `${this.apiUrl}/room`

  getRoomTypes(): Observable<RoomTypesSuccessWithMeta> {
    return this.http.get<RoomTypesSuccessWithMeta>(`${this.apiUrl}/room_type/list`)
  }

  getBuildings(): Observable<BuildingSuccessWithMeta> {
    return this.http.get<BuildingSuccessWithMeta>(`${this.apiUrl}/building/list`)
  }

  getFacilities(): Observable<FacilitySuccessWithMeta> {
    return this.http.get<FacilitySuccessWithMeta>(`${this.apiUrl}/facility/list`)
  }
}