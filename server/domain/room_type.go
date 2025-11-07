package domain

type RoomType struct {
	Base
	Name string `json:"name" binding:"required"`
}

type RoomTypeCreatePayload struct {
	Name string `json:"name" binding:"required"`
}

type RoomTypeUpdatePayload = RoomType
type RoomTypeSuccessRes = SuccessResponseWithData[RoomType]
type RoomTypeListRes = SuccessResponseWithMeta[[]RoomType]
