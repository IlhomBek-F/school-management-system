package repository

import (
	"context"
	"school/domain"
	"time"

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
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	facility := domain.Facility{}
	facility.Name = payload.Name

	result := r.db.WithContext(ctx).Create(&facility)

	return facility, result.Error
}

func (r facilityRepository) GetList() ([]domain.Facility, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var facilities []domain.Facility
	result := r.db.WithContext(ctx).Find(&facilities)

	return facilities, result.Error
}

func (r facilityRepository) GetByID(id int) (domain.Facility, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var facility domain.Facility
	result := r.db.WithContext(ctx).Where("id = ?", id).First(&facility)

	return facility, result.Error
}

func (r facilityRepository) Update(payload domain.FacilityUpdatePayload) (domain.Facility, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	result := r.db.WithContext(ctx).Updates(&payload)
	return payload, result.Error
}

func (r facilityRepository) Delete(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	return r.db.WithContext(ctx).Delete(domain.Facility{}, id).Error
}
