import { Base, ResDataWithMeta } from "./base";

export interface Facility extends Base {
  name: string
}

export type FacilitySuccessWithMeta = ResDataWithMeta<Facility[]>