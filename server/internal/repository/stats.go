package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type StatsRepository interface {
	GetQuickStats() (domain.QuickStats, error)
	GetRoomStats() (domain.RoomStats, error)
	GetStudentStats() (domain.StudentStats, error)
	GetTeacherStats() (domain.TeacherStats, error)
	GetClassStats() (domain.ClassStats, error)
}

type statsRepository struct {
	db *gorm.DB
}

func NewStatsRepository(db *gorm.DB) StatsRepository {
	return statsRepository{db: db}
}

func (r statsRepository) GetQuickStats() (domain.QuickStats, error) {
	return domain.QuickStats{Students: 2321, Classes: 321}, nil
}

func (r statsRepository) GetRoomStats() (domain.RoomStats, error) {
	return domain.RoomStats{}, nil
}

func (r statsRepository) GetStudentStats() (domain.StudentStats, error) {
	return domain.StudentStats{}, nil
}

func (r statsRepository) GetTeacherStats() (domain.TeacherStats, error) {
	return domain.TeacherStats{}, nil
}

func (r statsRepository) GetClassStats() (domain.ClassStats, error) {
	return domain.ClassStats{}, nil
}
