package usecase

import (
	"school/domain"
	"school/internal/repository"
)

type StudentUsecase interface {
	Create(payload domain.StudentCreatePayload) (domain.Student, error)
	Update(payload domain.StudentUpdatePayload) (domain.Student, error)
	Delete(id int) error
	GetById(id int) (domain.Student, error)
}

type studentUsecase struct {
	studentRespository repository.StudentRepository
}

func NewStudentUsecase(studentRepo repository.StudentRepository) StudentUsecase {
	return studentUsecase{studentRespository: studentRepo}
}

func (s studentUsecase) Create(payload domain.StudentCreatePayload) (domain.Student, error) {
	student, err := s.studentRespository.Create(payload)

	return student, err
}

func (s studentUsecase) Update(payload domain.StudentUpdatePayload) (domain.Student, error) {
	student, err := s.studentRespository.Update(payload)

	return student, err
}

func (s studentUsecase) GetById(id int) (domain.Student, error) {
	student, err := s.studentRespository.GetById(id)

	return student, err
}

func (s studentUsecase) Delete(id int) error {
	err := s.studentRespository.Delete(id)

	return err
}
