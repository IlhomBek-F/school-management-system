package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type RoomRepository interface {
	Create(payload domain.RoomCreatePayload) (domain.Room, error)
	GetByID(id int) (domain.Room, error)
	Update(payload domain.RoomUpdatePayload) (domain.Room, error)
	Delete(id int) error
}

type roomRepository struct {
	db *gorm.DB
}

func NewRoomRepository(db *gorm.DB) RoomRepository {
	return roomRepository{db: db}
}

func (r roomRepository) Create(payload domain.RoomCreatePayload) (domain.Room, error) {
	result := r.db.Create(&payload)

	return payload, result.Error
}

func (r roomRepository) GetByID(id int) (domain.Room, error) {
	var Room domain.Room
	result := r.db.Where("id = ?", id).First(&Room)

	return Room, result.Error
}

func (r roomRepository) Update(payload domain.RoomUpdatePayload) (domain.Room, error) {
	result := r.db.Updates(&payload)
	return payload, result.Error
}

func (r roomRepository) Delete(id int) error {
	return r.db.Delete(domain.Room{}, id).Error
}
