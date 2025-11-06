package domain

type Room struct {
	Base
	Name        string `json:"name" binding:"required"`
	Code        string `json:"code" binding:"required"`
	Number      int    `json:"number"`
	RoomTypeId  int    `json:"room_type_id" binding:"required"`
	BuildingId  string `json:"building_id" binding:"required"`
	FloorId     int    `json:"floor_id" binding:"required"`
	Status      string `json:"status" binding:"required"`
	Capacity    int    `json:"capacity"`
	Area        int    `json:"area"`
	Description string `json:"description"`
}

type RoomCreatePayload = Room
type RoomUpdatePayload = Room
type RoomSuccessRes = SuccessResponseWithData[Room]
type RoomListRes = SuccessResponseWithMeta[[]Room]
