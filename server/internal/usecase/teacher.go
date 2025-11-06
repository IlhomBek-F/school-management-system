package usecase

import (
	"errors"
	"school/domain"
	"school/internal/repository"

	"gorm.io/gorm"
)

type TeacherUsecase interface {
	Create(payload domain.TeacherCreatePayload) (domain.Teacher, error)
	Update(payload domain.TeacherUpdatePayload) (domain.Teacher, error)
	Delete(id int) error
	GetById(id int) (domain.Teacher, error)
	GetList() ([]domain.Teacher, error)
}

type teacherUsecase struct {
	teacherRepo repository.TeacherRepository
}

func NewTeacherUsecase(teacherRepo repository.TeacherRepository) TeacherUsecase {
	return teacherUsecase{teacherRepo: teacherRepo}
}

func (t teacherUsecase) GetList() ([]domain.Teacher, error) {
	teachers, err := t.teacherRepo.GetList()

	return teachers, err
}

func (t teacherUsecase) Create(payload domain.TeacherCreatePayload) (domain.Teacher, error) {
	teacher, err := t.teacherRepo.Create(payload)

	return teacher, err
}

func (t teacherUsecase) Update(payload domain.TeacherUpdatePayload) (domain.Teacher, error) {
	teacher, err := t.teacherRepo.Update(payload)

	return teacher, err
}

func (t teacherUsecase) GetById(id int) (domain.Teacher, error) {
	teacher, err := t.teacherRepo.GetById(id)

	return teacher, err
}

func (t teacherUsecase) Delete(id int) error {
	_, err := t.GetById(id)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return domain.ErrTeacherNotFound
		}

		return domain.ErrInternalServer
	}

	return t.teacherRepo.Delete(id)
}
