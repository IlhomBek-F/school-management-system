package domain

type Class struct {
	Base
	BasicInformation    BasicInformation    `json:"basic_info" gorm:"embedded" binding:"required"`
	ScheduleInformation ScheduleInformation `json:"schedule_info" gorm:"embedded" binding:"required"`
}

type BasicInformation struct {
	Name        string `json:"name" gorm:"embedded" binding:"required"`
	Code        string `json:"code" gorm:"embedded" binding:"required"`
	SubjectId   int    `json:"subject_id" gorm:"embedded" binding:"required"`
	TeacherId   int    `json:"teacher_id" gorm:"embedded" binding:"required"`
	GradeId     int    `json:"grade_id" gorm:"embedded" binding:"required"`
	SectionId   int    `json:"section_id" gorm:"embedded" binding:"required"`
	ClassTypeId int    `json:"class_type_id" gorm:"embedded" binding:"required"`
	Description string `json:"description" gorm:"embedded" binding:"required"`
}

type ScheduleInformation struct {
	StartDate         string `json:"start_date" gorm:"embedded" binding:"required"`
	EndDate           string `json:"end_date" gorm:"embedded" binding:"required"`
	StartTime         string `json:"start_time" gorm:"embedded" binding:"required"`
	EndTime           string `json:"end_time" gorm:"embedded" binding:"required"`
	Duration          int    `json:"duration" gorm:"embedded" binding:"required"`
	ClassDaysIds      []int  `json:"class_days_ids" gorm:"embedded, type:integer[]" binding:"required"`
	RoomId            int    `json:"room_id" gorm:"embedded" binding:"required"`
	MaxCapacity       int    `json:"max_capacity" gorm:"embedded" binding:"required"`
	MinCapacity       int    `json:"min_capacity" gorm:"embedded"`
	CurrentEnrollment int    `json:"current_enrollment" gorm:"embedded"`
}

type ClassCreatePayload = Class
type ClassUpdatePayload = Class
type ClassSuccessRes = SuccessResponseWithData[Class]
type ClassListRes = SuccessResponseWithMeta[[]Class]
