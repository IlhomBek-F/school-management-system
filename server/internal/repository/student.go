package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type StudentRepository interface {
	GetStudentById(id int) (domain.Student, error)
}

type studentRepository struct {
	Db *gorm.DB
}

func NewStudentRepository(db *gorm.DB) StudentRepository {
	return studentRepository{Db: db}
}

func (r studentRepository) GetStudentById(id int) (domain.Student, error) {
	var student domain.Student
	result := r.Db.Where("id = ?", id).First(&student)

	return student, result.Error
}
