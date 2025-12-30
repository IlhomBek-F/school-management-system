package domain

import "github.com/lib/pq"

type Class struct {
	Base
	BasicInformation    BasicInformation    `json:"basic_info" gorm:"embedded" binding:"required"`
	ScheduleInformation ScheduleInformation `json:"schedule_info" gorm:"embedded" binding:"required"`
}

type ClassCreate struct {
	Base
	BasicInformation    BasicInformationFields `json:"basic_info" gorm:"embedded" binding:"required"`
	ScheduleInformation ScheduleInformation    `json:"schedule_info" gorm:"embedded" binding:"required"`
}

type BasicInformationFields struct {
	Name        string `json:"name" gorm:"embedded" binding:"required"`
	Code        string `json:"code" gorm:"embedded" binding:"required"`
	SubjectId   int    `json:"subject_id" gorm:"embedded" binding:"required"`
	TeacherId   int    `json:"teacher_id" gorm:"embedded" binding:"required"`
	SectionId   int    `json:"section_id" gorm:"embedded" binding:"required"`
	ClassTypeId int    `json:"class_type_id" gorm:"embedded" binding:"required"`
	GradeId     int    `json:"grade_id" gorm:"embedded" binding:"required"`
	Description string `json:"description" gorm:"embedded" binding:"required"`
}

type BasicInformation struct {
	BasicInformationFields
	Teacher Teacher `json:"teacher" gorm:"foreignKey:ID"`
	Subject Subject `json:"subject" gorm:"foreignKey:ID"`
	Room    Room    `json:"room" gorm:"foreignKey:ID"`
}

type ScheduleInformation struct {
	StartDate          string        `json:"start_date" gorm:"embedded" binding:"required"`
	EndDate            string        `json:"end_date" gorm:"embedded" binding:"required"`
	StartTime          string        `json:"start_time" gorm:"embedded" binding:"required"`
	EndTime            string        `json:"end_time" gorm:"embedded" binding:"required"`
	Duration           int           `json:"duration" gorm:"embedded" binding:"required"`
	ClassDaysIds       pq.Int64Array `json:"class_days_ids" gorm:"type:jsonb" binding:"required"`
	RoomId             int           `json:"room_id" gorm:"embedded" binding:"required"`
	MaxCapacity        int           `json:"max_capacity" gorm:"embedded" binding:"required"`
	MinCapacity        int           `json:"min_capacity" gorm:"embedded"`
	CurrentEnrollments int           `json:"current_enrollments" gorm:"embedded"`
}

type ClassStats struct {
	TotalClasses     int `json:"total_classes"`
	ActiveClasses    int `json:"active_classes"`
	TotalEnrollments int `json:"total_enrollments"`
	AvgCapacity      int `json:"avg_capacity"`
}

type ClassCreatePayload = ClassCreate
type ClassUpdatePayload = ClassCreate
type ClassSuccessRes = SuccessResponseWithData[Class]
type ClassListRes = SuccessResponseWithMeta[[]Class]
type ClassStatsResSuccess = SuccessResponseWithData[ClassStats]
