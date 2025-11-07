package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type FacilityRepository interface {
	Create(payload domain.FacilityCreatePayload) (domain.Facility, error)
	GetByID(id int) (domain.Facility, error)
	Update(payload domain.FacilityUpdatePayload) (domain.Facility, error)
	Delete(id int) error
	GetList() ([]domain.Facility, error)
}

type facilityRepository struct {
	db *gorm.DB
}

func NewFacilityRepository(db *gorm.DB) FacilityRepository {
	return facilityRepository{db: db}
}

func (r facilityRepository) Create(payload domain.FacilityCreatePayload) (domain.Facility, error) {
	result := r.db.Create(&payload)

	return payload, result.Error
}

func (r facilityRepository) GetList() ([]domain.Facility, error) {
	var facilities []domain.Facility
	result := r.db.Find(&facilities)

	return facilities, result.Error
}

func (r facilityRepository) GetByID(id int) (domain.Facility, error) {
	var facility domain.Facility
	result := r.db.Where("id = ?", id).First(&facility)

	return facility, result.Error
}

func (r facilityRepository) Update(payload domain.FacilityUpdatePayload) (domain.Facility, error) {
	result := r.db.Updates(&payload)
	return payload, result.Error
}

func (r facilityRepository) Delete(id int) error {
	return r.db.Delete(domain.Facility{}, id).Error
}
