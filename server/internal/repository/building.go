package repository

import (
	"context"
	"school/domain"
	"time"

	"gorm.io/gorm"
)

type BuildingRepository interface {
	Create(payload domain.BuildingCreatePayload) (domain.Building, error)
	GetByID(id int) (domain.Building, error)
	Update(payload domain.BuildingUpdatePayload) (domain.Building, error)
	Delete(id int) error
	GetList() ([]domain.Building, error)
}

type buildingRepository struct {
	db *gorm.DB
}

func NewBuildingRepository(db *gorm.DB) BuildingRepository {
	return buildingRepository{db: db}
}

func (r buildingRepository) Create(payload domain.BuildingCreatePayload) (domain.Building, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	building := domain.Building{}
	building.Name = payload.Name

	result := r.db.WithContext(ctx).Create(&building)

	return building, result.Error
}

func (r buildingRepository) GetList() ([]domain.Building, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var buildings []domain.Building
	result := r.db.WithContext(ctx).Find(&buildings)

	return buildings, result.Error
}

func (r buildingRepository) GetByID(id int) (domain.Building, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var building domain.Building
	result := r.db.WithContext(ctx).Where("id = ?", id).First(&building)

	return building, result.Error
}

func (r buildingRepository) Update(payload domain.BuildingUpdatePayload) (domain.Building, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	result := r.db.WithContext(ctx).Updates(&payload)
	return payload, result.Error
}

func (r buildingRepository) Delete(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	return r.db.WithContext(ctx).Delete(domain.Building{}, id).Error
}
