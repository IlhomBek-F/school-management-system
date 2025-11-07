package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type ClassRepository interface {
	Create(payload domain.ClassCreatePayload) (domain.Class, error)
	Update(payload domain.ClassUpdatePayload) (domain.Class, error)
	Delete(id int) error
	GetById(id int) (domain.Class, error)
	GetList() ([]domain.Class, error)
}

type classRepository struct {
	Db *gorm.DB
}

func NewClassRepository(db *gorm.DB) ClassRepository {
	return classRepository{Db: db}
}

func (r classRepository) Create(payload domain.ClassCreatePayload) (domain.Class, error) {
	result := r.Db.Create(&payload)

	return payload, result.Error
}

func (r classRepository) GetList() ([]domain.Class, error) {
	var classes []domain.Class
	result := r.Db.Find(&classes)
	return classes, result.Error
}

func (r classRepository) Update(payload domain.ClassUpdatePayload) (domain.Class, error) {
	result := r.Db.Updates(&payload)

	return payload, result.Error
}

func (r classRepository) Delete(id int) error {
	result := r.Db.Delete(domain.Class{}, id)

	return result.Error
}

func (r classRepository) GetById(id int) (domain.Class, error) {
	var class domain.Class

	result := r.Db.Where("id = ?", id).First(&class)

	return class, result.Error
}
