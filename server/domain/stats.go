package domain

type QuickStats struct {
	Students int `json:"students"`
	Classes  int `json:"classes"`
}

type RoomStats struct {
	TotalRooms     int `json:"total_rooms"`
	AvailableRooms int `json:"available_rooms"`
	TotalCapcity   int `json:"total_capacity"`
	AvgOccupancy   int `json:"avg_occupancy"`
}

type QuickStatsResSuccess = SuccessResponseWithData[QuickStats]
type RoomStatsResSuccess = SuccessResponseWithData[RoomStats]
