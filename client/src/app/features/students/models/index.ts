import { Base, Paginator, ResData, ResDataWithMeta } from "@core/models/base";

export interface UpsertStudentPayload extends Base {
  first_name: string;
  last_name: string;
  student_id: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  blood_group_id: number;
  street_address: string;
  city: string;
  grade_id: number;
  class_section_id: number;
  admission_date: string;
  previous_school: string;
  emergency_contact: string;
}

export type Student = UpsertStudentPayload

export interface StudentQuery extends Paginator {
  grade_id: number;
  search: string
}

export type StudentSuccessRes = ResData<Student>
export type StudentListSuccessRes = ResDataWithMeta<Student[]>
