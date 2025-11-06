package usecase

import (
	"school/domain"
	"school/internal/repository"
)

type BuildingUsecase interface {
	Create(payload domain.BuildingCreatePayload) (domain.Building, error)
	Update(payload domain.BuildingUpdatePayload) (domain.Building, error)
	Delete(id int) error
	GetById(id int) (domain.Building, error)
}

type buildingUsecase struct {
	buildingRepo repository.BuildingRepository
}

func NewBuildingUsecase(buildingRepo repository.BuildingRepository) BuildingUsecase {
	return buildingUsecase{buildingRepo: buildingRepo}
}

func (b buildingUsecase) Create(payload domain.BuildingCreatePayload) (domain.Building, error) {
	building, err := b.buildingRepo.Create(payload)

	return building, err
}

func (b buildingUsecase) Update(payload domain.BuildingUpdatePayload) (domain.Building, error) {
	building, err := b.buildingRepo.Update(payload)

	return building, err
}

func (b buildingUsecase) GetById(id int) (domain.Building, error) {
	building, err := b.buildingRepo.GetByID(id)

	return building, err
}

func (b buildingUsecase) Delete(id int) error {
	err := b.buildingRepo.Delete(id)

	return err
}
