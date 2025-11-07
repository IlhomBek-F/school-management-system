package usecase

import (
	"school/domain"
	"school/internal/repository"
)

type FacilityUsecase interface {
	Create(payload domain.FacilityCreatePayload) (domain.Facility, error)
	Update(payload domain.FacilityUpdatePayload) (domain.Facility, error)
	Delete(id int) error
	GetById(id int) (domain.Facility, error)
	GetList() ([]domain.Facility, error)
}

type facilityUsecase struct {
	facilityRepo repository.FacilityRepository
}

func NewFacilityUsecase(facilityRepo repository.FacilityRepository) FacilityUsecase {
	return facilityUsecase{facilityRepo: facilityRepo}
}

func (f facilityUsecase) Create(payload domain.FacilityCreatePayload) (domain.Facility, error) {
	facility, err := f.facilityRepo.Create(payload)

	return facility, err
}

func (f facilityUsecase) Update(payload domain.FacilityUpdatePayload) (domain.Facility, error) {
	facility, err := f.facilityRepo.Update(payload)

	return facility, err
}

func (f facilityUsecase) GetList() ([]domain.Facility, error) {
	facilities, err := f.facilityRepo.GetList()

	return facilities, err
}

func (f facilityUsecase) GetById(id int) (domain.Facility, error) {
	facility, err := f.facilityRepo.GetByID(id)

	return facility, err
}

func (f facilityUsecase) Delete(id int) error {
	err := f.facilityRepo.Delete(id)

	return err
}
