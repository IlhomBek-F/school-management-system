package usecase

import (
	"errors"
	"school/domain"
	"school/internal/repository"

	"gorm.io/gorm"
)

type StudentUsecase interface {
	Create(payload domain.StudentCreatePayload) (domain.Student, error)
	Update(payload domain.StudentUpdatePayload) (domain.Student, error)
	Delete(id int) error
	GetById(id int) (domain.Student, error)
	GetList() ([]domain.Student, domain.Meta, error)
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

func (s studentUsecase) GetList() ([]domain.Student, domain.Meta, error) {
	students, total, err := s.studentRespository.GetList()

	meta := domain.Meta{
		PerPage:     10,
		CurrentPage: 1,
		Total:       total,
	}

	return students, meta, err
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

	student, err := s.studentRespository.GetById(id)

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return domain.ErrStudentNotFound
	} else if err != nil {
		return domain.ErrInternalServer
	}

	err = s.studentRespository.Delete(student.ID)

	return err
}
