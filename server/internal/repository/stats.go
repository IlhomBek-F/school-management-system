package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type StatsRepository interface {
	GetQuickStats() (domain.QuickStats, error)
	GetRoomStats() (domain.RoomStats, error)
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
