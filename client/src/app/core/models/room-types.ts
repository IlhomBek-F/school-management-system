import { Base, ResDataWithMeta } from "./base";

export interface RoomType extends Base {
  name: string
}

export type RoomTypesSuccessWithMeta = ResDataWithMeta<RoomType[]>
