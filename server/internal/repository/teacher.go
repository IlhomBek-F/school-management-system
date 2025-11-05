package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type TeacherRepository interface {
	GetTeacherById(id int) (domain.Teacher, error)
}

type teacherRepository struct {
	Db *gorm.DB
}

func NewTeacherRepository(db *gorm.DB) TeacherRepository {
	return teacherRepository{Db: db}
}

func (r teacherRepository) GetTeacherById(id int) (domain.Teacher, error) {
	var teacher domain.Teacher

	result := r.Db.Where("id = ?", id).First(&teacher)

	return teacher, result.Error
}
