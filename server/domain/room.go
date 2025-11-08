package domain

type RoomFields struct {
	Name        string     `json:"name" binding:"required"`
	Code        string     `json:"code" binding:"required"`
	Number      int        `json:"number"`
	RoomTypeId  int        `json:"room_type_id" binding:"required"`
	BuildingId  int        `json:"building_id" binding:"required"`
	FloorId     int        `json:"floor_id" binding:"required"`
	Status      string     `json:"status" binding:"required"`
	Capacity    int        `json:"capacity"`
	Area        int        `json:"area"`
	Description string     `json:"description"`
	Facilities  []Facility `json:"facilities" binding:"required" gorm:"many2many:room_facilities"`
}

type Room struct {
	Base
	RoomFields
	RoomType RoomType `json:"room_type" gorm:"foreignKey:RoomTypeId"`
	Building Building `json:"building" gorm:"foreignKey:BuildingId"`
}

type RoomFacility struct {
	Id         int `json:"id"`
	RoomId     int `json:"room_id"`
	FacilityId int `json:"facility_id"`
}

type RoomCreatePayload = RoomFields
type RoomUpdatePayload = Room
type RoomSuccessRes = SuccessResponseWithData[Room]
type RoomListRes = SuccessResponseWithMeta[[]Room]
