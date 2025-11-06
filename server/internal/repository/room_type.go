package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type RoomTypeRepository interface {
	Create(payload domain.RoomTypeCreatePayload) (domain.RoomType, error)
	GetByID(id int) (domain.RoomType, error)
	Update(payload domain.RoomTypeUpdatePayload) (domain.RoomType, error)
	Delete(id int) error
}

type roomTypeRepository struct {
	db *gorm.DB
}

func NewRoomTypeRepository(db *gorm.DB) RoomTypeRepository {
	return roomTypeRepository{db: db}
}

func (r roomTypeRepository) Create(payload domain.RoomTypeCreatePayload) (domain.RoomType, error) {
	result := r.db.Create(&payload)

	return payload, result.Error
}

func (r roomTypeRepository) GetByID(id int) (domain.RoomType, error) {
	var Room domain.RoomType
	result := r.db.Where("id = ?", id).First(&Room)

	return Room, result.Error
}

func (r roomTypeRepository) Update(payload domain.RoomTypeUpdatePayload) (domain.RoomType, error) {
	result := r.db.Updates(&payload)
	return payload, result.Error
}

func (r roomTypeRepository) Delete(id int) error {
	return r.db.Delete(domain.Facicility{}, id).Error
}
