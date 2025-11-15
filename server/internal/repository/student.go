package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type StudentRepository interface {
	Create(payload domain.StudentCreatePayload) (domain.Student, error)
	Update(payload domain.StudentUpdatePayload) (domain.Student, error)
	GetById(id int) (domain.Student, error)
	GetList() ([]domain.Student, error)
	Delete(id int) error
}

type studentRepository struct {
	Db *gorm.DB
}

func NewStudentRepository(db *gorm.DB) StudentRepository {
	return studentRepository{Db: db}
}

func (r studentRepository) Create(payload domain.StudentCreatePayload) (domain.Student, error) {
	student := domain.Student{
		PersonalInfo: payload.PersonalInfo,
		AcademicInfo: payload.AcademicInfo,
	}
	result := r.Db.Create(&student)

	return student, result.Error
}

func (r studentRepository) Update(payload domain.StudentUpdatePayload) (domain.Student, error) {
	result := r.Db.Updates(&payload)

	return payload, result.Error
}

func (r studentRepository) Delete(id int) error {
	result := r.Db.Delete(domain.Student{}, id)

	return result.Error
}

func (r studentRepository) GetList() ([]domain.Student, error) {
	var students []domain.Student
	result := r.Db.Find(&students)

	return students, result.Error
}

func (r studentRepository) GetById(id int) (domain.Student, error) {
	var student domain.Student
	result := r.Db.Where("id = ?", id).First(&student)

	return student, result.Error
}
