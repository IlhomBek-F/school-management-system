import { Base, ResDataWithMeta } from "./base";

export interface Subject extends Base {
  name: string;
  description: string
}

export type SubjectSuccessWithMeta = ResDataWithMeta<Subject[]>
