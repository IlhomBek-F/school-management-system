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

export interface ResDataWithMeta<T> extends ResData<T>{
  meta: {
    total: number;
    per_page: number;
    current_page: number
  }
}

export interface DropdownOption {
  label: string,
  value: any
}


