import { Base, Paginator, ResData, ResDataWithMeta } from "@core/models/base";
import { Subject } from "@core/models/subject";

export interface UpsertTeacherPayload extends Base {
  personal_info: PersonalInfo;
  professional_info: ProfessionalInfo;
  employment_detail: EmploymentDetail
}

export interface PersonalInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  street_address: string;
  city: string;
}

export interface ProfessionalInfo {
  teacher_id: string;
  department_id: number;
  subjects: Subject[];
  qualification: string;
  uni_or_ins_name: string;
  graduation_year: string;
  experience: number;
}

export interface EmploymentDetail {
  joining_date: string;
  employment_type: string;
  salary: number;
  contract_end_date: string
}

export type Teacher = UpsertTeacherPayload & {
  gpa: number;
  attendance: number;
  subjects: number;
}

export interface TeacherStats {
  total_teachers: number;
  avg_experience: number;
  total_students: number;
  avg_rating: number;
}

export interface TeacherQuery extends Paginator {
  search: string;
  department_id: number;
}

export type TeacherSuccessRes = ResData<Teacher>
export type TeacherListSuccessRes = ResDataWithMeta<Teacher[]>
