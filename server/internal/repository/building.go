package repository

import (
	"school/domain"

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
	building := domain.Building{}
	building.Name = payload.Name

	result := r.db.Create(&building)

	return building, result.Error
}

func (r buildingRepository) GetList() ([]domain.Building, error) {
	var buildings []domain.Building
	result := r.db.Find(&buildings)
	return buildings, result.Error
}

func (r buildingRepository) GetByID(id int) (domain.Building, error) {
	var building domain.Building
	result := r.db.Where("id = ?", id).First(&building)

	return building, result.Error
}

func (r buildingRepository) Update(payload domain.BuildingUpdatePayload) (domain.Building, error) {
	result := r.db.Updates(&payload)
	return payload, result.Error
}

func (r buildingRepository) Delete(id int) error {
	return r.db.Delete(domain.Building{}, id).Error
}
