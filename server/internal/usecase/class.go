package usecase

import (
	"school/domain"
	"school/internal/repository"
)

type ClassUsecase interface {
	Create(payload domain.ClassCreatePayload) (domain.Class, error)
	Update(payload domain.ClassUpdatePayload) (domain.ClassCreate, error)
	Delete(id int) error
	GetById(id int) (domain.Class, error)
	GetList() ([]domain.Class, domain.Meta, error)
}

type classUsecase struct {
	classRepo repository.ClassRepository
}

func NewClassUsecase(classRepo repository.ClassRepository) ClassUsecase {
	return classUsecase{classRepo: classRepo}
}

func (s classUsecase) Create(payload domain.ClassCreatePayload) (domain.Class, error) {
	class, err := s.classRepo.Create(payload)

	return class, err
}

func (s classUsecase) GetList() ([]domain.Class, domain.Meta, error) {
	classes, total, err := s.classRepo.GetList()

	meta := domain.Meta{
		PerPage:     10,
		CurrentPage: 1,
		Total:       total,
	}

	return classes, meta, err
}

func (s classUsecase) Update(payload domain.ClassUpdatePayload) (domain.ClassCreate, error) {
	class, err := s.classRepo.Update(payload)

	return class, err
}

func (s classUsecase) GetById(id int) (domain.Class, error) {
	class, err := s.classRepo.GetById(id)

	return class, err
}

func (s classUsecase) Delete(id int) error {
	err := s.classRepo.Delete(id)

	return err
}
