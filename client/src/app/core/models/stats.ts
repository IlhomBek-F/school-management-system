import { ResData } from "./base";

export interface QuickStats {
  students: number;
  classes: number;
}

export interface RoomStats {
  total_rooms: number;
  available_rooms: number;
  total_capacity: number;
  avg_occupancy: number
}

export type QuickStatsSuccessRes = ResData<QuickStats>
export type RoomStatsSuccessRes = ResData<RoomStats>
