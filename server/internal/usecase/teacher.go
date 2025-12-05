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
	GetList(query domain.TeacherQuery) ([]domain.Teacher, domain.Meta, error)
}

type teacherUsecase struct {
	teacherRepo repository.TeacherRepository
}

func NewTeacherUsecase(teacherRepo repository.TeacherRepository) TeacherUsecase {
	return teacherUsecase{teacherRepo: teacherRepo}
}

func (t teacherUsecase) GetList(query domain.TeacherQuery) ([]domain.Teacher, domain.Meta, error) {
	teachers, total, err := t.teacherRepo.GetList(query)

	for index, teacher := range teachers {
		teachers[index].PersonalInfo.FullName = teacher.PersonalInfo.FirstName + " " + teacher.PersonalInfo.LastName
	}

	meta := domain.Meta{
		PerPage:     query.PerPage,
		CurrentPage: query.Page,
		Total:       total,
	}

	return teachers, meta, err
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
