import { FormGroup } from "@angular/forms";
import { FormContainer } from "./question-base";

export interface Base {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null
}

export interface ResSuccess {
  status: number,
  message: string,
}

export interface ResData<T> extends ResSuccess  {
  data: T,
}

export interface Meta {
    total: number;
    per_page: number;
    current_page: number
}

export interface ResDataWithMeta<T> extends ResData<T>{
  meta: Meta
}

export interface DropdownOption {
  label: string,
  value: any
}

export interface Paginator {
  page: number;
  per_page: number
}

export interface TabItem {
  title: string,
  value: string,
  formContainers: FormContainer[],
  form: FormGroup
}

