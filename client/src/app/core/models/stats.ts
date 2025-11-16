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

export interface StudentStats {
  total_students: number;
  avg_attendance: number;
  avg_gpa: number;
  active_classes: number
}

export type QuickStatsSuccessRes = ResData<QuickStats>
export type RoomStatsSuccessRes = ResData<RoomStats>
export type StudentStatsSuccessRes = ResData<StudentStats>
