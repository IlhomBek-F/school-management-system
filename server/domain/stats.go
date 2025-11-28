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

type StudentStats struct {
	TotalStudents int `json:"total_students"`
	AvgAttendance int `json:"avg_attendance"`
	AvgGpa        int `json:"avg_gpa"`
	ActiveClasses int `json:"active_classes"`
}

type TeacherStats struct {
	TotalTeachers int `json:"total_teachers"`
	AvgExp        int `json:"avg_experience"`
	TotalStudents int `json:"total_students"`
	AvgRating     int `json:"avg_rating"`
}

type QuickStatsResSuccess = SuccessResponseWithData[QuickStats]
type RoomStatsResSuccess = SuccessResponseWithData[RoomStats]
type StudentStatsResSuccess = SuccessResponseWithData[StudentStats]
type TeacherStatsResSuccess = SuccessResponseWithData[TeacherStats]
