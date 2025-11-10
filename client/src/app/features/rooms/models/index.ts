import { Base, ResData, ResDataWithMeta } from "@core/models/base";
import { RoomStatus } from "../enums";
import { Facility, FacilitySuccessWithMeta } from "@core/models/facility";
import { Building, BuildingSuccessWithMeta } from "@core/models/building";
import { RoomType, RoomTypesSuccessWithMeta } from "@core/models/room-types";

export interface CreateRoomPayload {
  name: string;
  code: string;
  room_type_id: number;
  building_id: number;
  floor_id: number;
  capacity: number;
  facilities: Facility[];
  status: RoomStatus;
  description?: string;
  area?: number;
}

export type Room = Base & Omit<CreateRoomPayload, "building_id" | "facilities" | "room_type_id"> & {
  room_type: RoomType;
  building: Building;
  facilities: Facility[];
  color: string;
  currentOccupancy: number;
}

export interface RoomStats {
  totalRooms: number;
  availableRooms: number;
  totalCapacity: number;
  averageOccupancy: number
}

export type RoomSuccessRes = ResData<Room>
export type RoomStatsSuccessRes = ResData<RoomStats>
export type RoomListSuccessRes = ResDataWithMeta<Room[]>
export type RoomDropdownOptionsSuccess = [BuildingSuccessWithMeta, FacilitySuccessWithMeta, RoomTypesSuccessWithMeta]
