import { Base } from "@core/models/base";
import { RoomStatus } from "../enums";

export interface CreateRoomPayload {
  name: string;
  code: string;
  room_type_id: number;
  building_id: number;
  floor: number;
  capacity: number;
  currentOccupancy: number;
  facility_ids: number[];
  status: RoomStatus;
  color: string;
}

export type Room = Base & Omit<CreateRoomPayload, "building_id" | "facility_ids" | "room_type_id"> & {
  room_type: string;
  building: string;
  facilities: string[]
}
