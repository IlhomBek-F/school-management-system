import { Base, ResData, ResDataWithMeta } from "@core/models/base";

export interface UpsertClassPayload extends Base{
  basic_info: BasicInfo;
  schedule_info: ScheduleInfo;
}

export interface BasicInfo {
  name: string;
  class_code: string;
  subject_id: number;
  teacher_id: number;
  grade_id: number;
  section_id: number;
  class_type_id: number;
  description: string;
}

export interface ScheduleInfo {
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  duration: number;
  class_days_ids: number[];
  room_id: number;
  capacity: number;
  min_capacity: number;
  curr_enrollment: number;
}

export interface ClassStats {
  total_classes: number;
  active_classes: number;
  total_enrollments: number;
  avg_capacity: number;
}

export type ClassModel = UpsertClassPayload

export type ClassSuccessRes = ResData<ClassModel>
export type ClassListRes = ResDataWithMeta<ClassModel[]>
export type ClassStatsRes = ResData<ClassStats>
