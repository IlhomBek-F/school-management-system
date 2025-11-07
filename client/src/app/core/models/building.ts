import { Base, ResDataWithMeta } from "./base"

export interface Building extends Base {
  name: string
}

export type BuildingSuccessWithMeta = ResDataWithMeta<Building[]>