package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type StudentRepository interface {
	Create(payload domain.StudentCreatePayload) (domain.Student, error)
	Update(payload domain.StudentUpdatePayload) (domain.Student, error)
	Delete(id int) error
	GetById(id int) (domain.Student, error)
}

type studentRepository struct {
	Db *gorm.DB
}

func NewStudentRepository(db *gorm.DB) StudentRepository {
	return studentRepository{Db: db}
}

func (r studentRepository) Create(payload domain.StudentCreatePayload) (domain.Student, error) {
	result := r.Db.Create(&payload)

	return payload, result.Error
}

func (r studentRepository) Update(payload domain.StudentUpdatePayload) (domain.Student, error) {
	result := r.Db.Updates(&payload)

	return payload, result.Error
}

func (r studentRepository) Delete(id int) error {
	result := r.Db.Delete(domain.Student{}, id)

	return result.Error
}

func (r studentRepository) GetById(id int) (domain.Student, error) {
	var student domain.Student
	result := r.Db.Where("id = ?", id).First(&student)

	return student, result.Error
}
