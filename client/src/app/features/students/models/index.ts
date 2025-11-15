import { FormGroup } from "@angular/forms";
import { Base, Paginator, ResData, ResDataWithMeta } from "@core/models/base";
import { FormContainer } from "@core/models/question-base";

export interface UpsertStudentPayload extends Base {
  personal_info: PersonalInfo;
  academic_info: AcademicInfo;
}

export interface PersonalInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  blood_group_id: number;
  street_address: string;
  city: string;
}

export interface AcademicInfo {
  student_id: string;
  grade_id: number;
  class_section_id: number;
  admission_date: string;
  prev_school: string;
  emergency_contact: string;
}

export type Student = UpsertStudentPayload

export interface StudentQuery extends Paginator {
  grade_id: number;
  search: string
}

export interface TabItem {
  title: string,
  value: string,
  formContainers: FormContainer[],
  form: FormGroup
}

export type StudentSuccessRes = ResData<Student>
export type StudentListSuccessRes = ResDataWithMeta<Student[]>
