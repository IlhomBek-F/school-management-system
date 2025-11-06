package domain

type RoomType struct {
	Base
	Name string `json:"name" binding:"required"`
}

type RoomTypeCreatePayload = RoomType
type RoomTypeUpdatePayload = RoomType
type RoomTypeCreateRes = SuccessResponseWithData[RoomType]
type RoomTypeListRes = SuccessResponseWithMeta[[]RoomType]
