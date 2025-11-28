package usecase

import (
	"school/domain"
	"school/internal/repository"
)

type StatsUsecase interface {
	GetQuickStats() (domain.QuickStats, error)
	GetRoomStats() (domain.RoomStats, error)
	GetStudentStats() (domain.StudentStats, error)
	GetTeacherStats() (domain.TeacherStats, error)
}

type statsUsecase struct {
	statsRepo repository.StatsRepository
}

func NewStatsUsecase(statsRepo repository.StatsRepository) StatsUsecase {
	return statsUsecase{statsRepo: statsRepo}
}

func (s statsUsecase) GetQuickStats() (domain.QuickStats, error) {
	quickStats, err := s.statsRepo.GetQuickStats()

	return quickStats, err
}

func (s statsUsecase) GetRoomStats() (domain.RoomStats, error) {
	roomStats, err := s.statsRepo.GetRoomStats()

	return roomStats, err
}

func (s statsUsecase) GetStudentStats() (domain.StudentStats, error) {
	studentStats, err := s.statsRepo.GetStudentStats()

	return studentStats, err
}

func (s statsUsecase) GetTeacherStats() (domain.TeacherStats, error) {
	teacherStats, err := s.statsRepo.GetTeacherStats()

	return teacherStats, err
}
