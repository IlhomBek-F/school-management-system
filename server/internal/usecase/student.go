package usecase

import (
	"school/domain"
	"school/internal/repository"
)

type StudentUsecase interface {
	GetStudentById(id int) (domain.Student, error)
}

type studentUsecase struct {
	studentRespository repository.StudentRepository
}

func NewStudentUsecase(studentRepo repository.StudentRepository) StudentUsecase {
	return studentUsecase{studentRespository: studentRepo}
}

func (s studentUsecase) GetStudentById(id int) (domain.Student, error) {
	student, err := s.studentRespository.GetById(id)

	return student, err
}
