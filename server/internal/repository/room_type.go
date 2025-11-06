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
	GetList() ([]domain.RoomType, error)
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
	var roomType domain.RoomType
	result := r.db.Where("id = ?", id).First(&roomType)

	return roomType, result.Error
}

func (r roomTypeRepository) GetList() ([]domain.RoomType, error) {
	var roomTypes []domain.RoomType
	result := r.db.Find((&roomTypes))

	return roomTypes, result.Error
}

func (r roomTypeRepository) Update(payload domain.RoomTypeUpdatePayload) (domain.RoomType, error) {
	result := r.db.Updates(&payload)
	return payload, result.Error
}

func (r roomTypeRepository) Delete(id int) error {
	return r.db.Delete(domain.RoomType{}, id).Error
}
