import { Base, DropdownOption, Paginator, ResData, ResDataWithMeta } from "@core/models/base";
import { Subject } from "@core/models/subject";
import { Room } from "app/features/rooms/models";
import { Teacher } from "app/features/teachers/models";

export interface UpsertClassPayload extends Base{
  basic_info: BasicInfoFields;
  schedule_info: ScheduleInfo;
}

export interface ClassPayload extends Base {
  basic_info: BasicInfoFields & {
    subject: Subject;
    teacher: Teacher;
    room: Room;
  };
  schedule_info: ScheduleInfo;
}

export interface BasicInfoFields {
  name: string;
  code: string;
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
  class_days_ids: {value: number}[];
  room_id: number;
  max_capacity: number;
  min_capacity: number;
  curr_enrollment: number;
}

export interface ClassStats {
  total_classes: number;
  active_classes: number;
  total_enrollments: number;
  avg_capacity: number;
}

export interface ClassQuery extends Paginator{
  search: string;
  grade_id: number;
}

export type ClassModel = ClassPayload

export type ClassSuccessRes = ResData<ClassModel>
export type ClassListRes = ResDataWithMeta<ClassModel[]>
export type ClassStatsRes = ResData<ClassStats>
