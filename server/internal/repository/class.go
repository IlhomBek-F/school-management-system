package repository

import (
	"school/bootstrap"
	"school/domain"

	"gorm.io/gorm"
)

type ClassRepository interface {
	Create(payload domain.ClassCreatePayload) (domain.ClassCreate, error)
	Update(payload domain.ClassUpdatePayload) (domain.ClassUpdatePayload, error)
	Delete(id int) error
	GetById(id int) (domain.Class, error)
	GetList(query domain.ClassQuery) ([]domain.Class, int, error)
}

type classRepository struct {
	Db *gorm.DB
}

func NewClassRepository(db *gorm.DB) ClassRepository {
	return classRepository{Db: db}
}

func (r classRepository) Create(payload domain.ClassCreatePayload) (domain.ClassCreatePayload, error) {
	result := r.Db.Table("classes").Create(&payload)

	return payload, result.Error
}

func (r classRepository) GetList(query domain.ClassQuery) ([]domain.Class, int, error) {
	var classes []domain.Class
	var totalClasses int64
	paginator := domain.Paginator{PerPage: query.PerPage, Page: query.Page}

	db := r.Db.Model(&classes)

	if query.QueryTerm != "" {
		db = db.Where("name LIKE ? OR code LIKE ?", "%"+query.QueryTerm+"%", "%"+query.QueryTerm+"%")
	}

	if query.GradeId != 0 {
		db = db.Where("grade_id = ?", query.GradeId)
	}

	total := db.Count(&totalClasses)

	if total.Error != nil {
		return classes, 0, total.Error
	}

	result := db.Scopes(bootstrap.QueryScope(&paginator)).
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
	result := r.Db.Delete(&domain.Class{}, id)

	return result.Error
}

func (r classRepository) GetById(id int) (domain.Class, error) {
	var class domain.Class

	result := r.Db.Where("id = ?", id).First(&class)

	return class, result.Error
}
