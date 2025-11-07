import { Base, ResDataWithMeta } from "./base";

export interface RoomTypes extends Base {
  name: string
}

export type RoomTypesSuccessWithMeta = ResDataWithMeta<RoomTypes[]>