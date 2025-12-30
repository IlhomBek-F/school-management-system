package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type ClassRepository interface {
	Create(payload domain.ClassCreatePayload) (domain.Class, error)
	Update(payload domain.ClassUpdatePayload) (domain.ClassUpdatePayload, error)
	Delete(id int) error
	GetById(id int) (domain.Class, error)
	GetList() ([]domain.Class, int, error)
}

type classRepository struct {
	Db *gorm.DB
}

func NewClassRepository(db *gorm.DB) ClassRepository {
	return classRepository{Db: db}
}

func (r classRepository) Create(payload domain.ClassCreatePayload) (domain.Class, error) {
	var class domain.Class
	result := r.Db.Create(&class)

	return class, result.Error
}

func (r classRepository) GetList() ([]domain.Class, int, error) {
	var classes []domain.Class
	var totalClasses int64

	db := r.Db.Model(&classes)

	total := db.Count(&totalClasses)

	if total.Error != nil {
		return classes, 0, total.Error
	}

	result := db.
		Preload("Teacher").
		Preload("Subject").
		Preload("Room").
		Find(&classes)

	return classes, int(totalClasses), result.Error
}

func (r classRepository) Update(payload domain.ClassUpdatePayload) (domain.ClassUpdatePayload, error) {
	class, err := r.GetById(payload.ID)

	if err != nil {
		return domain.ClassUpdatePayload{}, err
	}

	result := r.Db.Table("classes").Where("id = ?", class.ID).Updates(&payload)

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
