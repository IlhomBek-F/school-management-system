package usecase

import (
	"school/domain"
	"school/internal/repository"
)

type SubjectUsecase interface {
	Create(payload domain.CreateSubjectPayload) (domain.Subject, error)
	Update(payload domain.UpdateSubjectPayload) (domain.Subject, error)
	Delete(id int) error
	GetById(id int) (domain.Subject, error)
}

type subjectUsecase struct {
	subjectRepo repository.SubjectRepository
}

func NewSubjectUsecase(subjectRepo repository.SubjectRepository) SubjectUsecase {
	return subjectUsecase{subjectRepo: subjectRepo}
}

func (s subjectUsecase) Create(payload domain.CreateSubjectPayload) (domain.Subject, error) {
	subject, err := s.subjectRepo.Create(payload)

	return subject, err
}

func (s subjectUsecase) Update(payload domain.UpdateSubjectPayload) (domain.Subject, error) {
	subject, err := s.subjectRepo.Update(payload)

	return subject, err
}

func (s subjectUsecase) GetById(id int) (domain.Subject, error) {
	subject, err := s.subjectRepo.GetByID(id)

	return subject, err
}

func (s subjectUsecase) Delete(id int) error {
	err := s.subjectRepo.Delete(id)

	return err
}
