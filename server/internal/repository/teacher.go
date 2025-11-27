package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type TeacherRepository interface {
	Create(payload domain.TeacherCreatePayload) (domain.Teacher, error)
	Update(payload domain.TeacherUpdatePayload) (domain.Teacher, error)
	Delete(id int) error
	GetById(id int) (domain.Teacher, error)
	GetList() ([]domain.Teacher, error)
}

type teacherRepository struct {
	Db *gorm.DB
}

func NewTeacherRepository(db *gorm.DB) TeacherRepository {
	return teacherRepository{Db: db}
}

func (r teacherRepository) GetList() ([]domain.Teacher, error) {
	var teachers []domain.Teacher
	result := r.Db.Preload("Subjects").Find(&teachers)

	return teachers, result.Error
}

func (r teacherRepository) Create(payload domain.TeacherCreatePayload) (domain.Teacher, error) {
	teacher := domain.Teacher{
		PersonalInfo:     payload.PersonalInfo,
		ProfessionalInfo: payload.ProfessionalInfo,
		EmploymentDetail: payload.EmploymentDetail,
	}

	result := r.Db.Create(&teacher)

	return teacher, result.Error
}

func (r teacherRepository) Update(payload domain.TeacherUpdatePayload) (domain.Teacher, error) {
	result := r.Db.Updates(&payload)

	return payload, result.Error
}

func (r teacherRepository) Delete(id int) error {
	result := r.Db.Delete(&domain.Teacher{}, id)

	return result.Error
}

func (r teacherRepository) GetById(id int) (domain.Teacher, error) {
	var teacher domain.Teacher

	result := r.Db.Where("id = ?", id).First(&teacher)

	return teacher, result.Error
}
