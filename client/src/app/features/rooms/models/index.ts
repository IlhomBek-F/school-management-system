import { Base, ResData, ResDataWithMeta } from "@core/models/base";
import { RoomStatus } from "../enums";
import { Facility, FacilitySuccessWithMeta } from "@core/models/facility";
import { Building, BuildingSuccessWithMeta } from "@core/models/building";
import { RoomType, RoomTypesSuccessWithMeta } from "@core/models/room-types";

export interface UpsertRoomPayload extends Base {
  name: string;
  code: string;
  number: number,
  room_type_id: number;
  building_id: number;
  floor_id: number;
  capacity: number;
  facilities: Facility[];
  status: RoomStatus;
  description?: string;
  area?: number;
}

export type Room = Base & Omit<UpsertRoomPayload, "building_id" | "facilities" | "room_type_id"> & {
  room_type: RoomType;
  building: Building;
  facilities: Facility[];
  color: string;
  currentOccupancy: number;
}

export type RoomSuccessRes = ResData<Room>
export type RoomListSuccessRes = ResDataWithMeta<Room[]>
export type RoomDropdownOptionsSuccess = [BuildingSuccessWithMeta, FacilitySuccessWithMeta, RoomTypesSuccessWithMeta]
