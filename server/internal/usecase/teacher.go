package usecase

import (
	"school/domain"
	"school/internal/repository"
)

type TeacherUsecase interface {
	GetTeacherById(id int) (domain.Teacher, error)
}

type teacherUsecase struct {
	teacherRepo repository.TeacherRepository
}

func NewTeacherUsecase(teacherRepo repository.TeacherRepository) TeacherUsecase {
	return teacherUsecase{teacherRepo: teacherRepo}
}

func (t teacherUsecase) GetTeacherById(id int) (domain.Teacher, error) {
	teacher, err := t.teacherRepo.GetTeacherById(id)

	return teacher, err
}
