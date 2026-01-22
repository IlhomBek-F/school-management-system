package repository

import (
	"context"
	"school/domain"
	"time"

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
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	roomType := domain.RoomType{}
	roomType.Name = payload.Name

	result := r.db.WithContext(ctx).Create(&roomType)

	return roomType, result.Error
}

func (r roomTypeRepository) GetByID(id int) (domain.RoomType, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var roomType domain.RoomType
	result := r.db.WithContext(ctx).Where("id = ?", id).First(&roomType)

	return roomType, result.Error
}

func (r roomTypeRepository) GetList() ([]domain.RoomType, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var roomTypes []domain.RoomType
	result := r.db.WithContext(ctx).Find((&roomTypes))

	return roomTypes, result.Error
}

func (r roomTypeRepository) Update(payload domain.RoomTypeUpdatePayload) (domain.RoomType, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	result := r.db.WithContext(ctx).Updates(&payload)
	return payload, result.Error
}

func (r roomTypeRepository) Delete(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	return r.db.WithContext(ctx).Delete(domain.RoomType{}, id).Error
}
