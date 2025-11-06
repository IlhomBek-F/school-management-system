package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type FacilityRepository interface {
	Create(payload domain.FacilityCreatePayload) (domain.Facicility, error)
	GetByID(id int) (domain.Facicility, error)
	Update(payload domain.FacilityUpdatePayload) (domain.Facicility, error)
	Delete(id int) error
}

type facilityRepository struct {
	db *gorm.DB
}

func NewfacilityRepository(db *gorm.DB) FacilityRepository {
	return facilityRepository{db: db}
}

func (r facilityRepository) Create(payload domain.FacilityCreatePayload) (domain.Facicility, error) {
	result := r.db.Create(&payload)

	return payload, result.Error
}

func (r facilityRepository) GetByID(id int) (domain.Facicility, error) {
	var facility domain.Facicility
	result := r.db.Where("id = ?", id).First(&facility)

	return facility, result.Error
}

func (r facilityRepository) Update(payload domain.FacilityUpdatePayload) (domain.Facicility, error) {
	result := r.db.Updates(&payload)
	return payload, result.Error
}

func (r facilityRepository) Delete(id int) error {
	return r.db.Delete(domain.Facicility{}, id).Error
}
