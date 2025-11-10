package usecase

import (
	"school/domain"
	"school/internal/repository"
)

type StatsUsecase interface {
	GetQuickStats() (domain.QuickStats, error)
	GetRoomStats() (domain.RoomStats, error)
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
