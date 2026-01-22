package repository

import (
	"context"
	"school/bootstrap"
	"school/domain"
	"time"

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
	db *gorm.DB
}

func NewClassRepository(db *gorm.DB) ClassRepository {
	return classRepository{db: db}
}

func (r classRepository) Create(payload domain.ClassCreatePayload) (domain.ClassCreatePayload, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	result := r.db.WithContext(ctx).Table("classes").Create(&payload)

	return payload, result.Error
}

func (r classRepository) GetList(query domain.ClassQuery) ([]domain.Class, int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var classes []domain.Class
	var totalClasses int64
	paginator := domain.Paginator{PerPage: query.PerPage, Page: query.Page}

	db := r.db.Model(&classes)

	if query.QueryTerm != "" {
		db = db.Where("name LIKE ? OR code LIKE ?", "%"+query.QueryTerm+"%", "%"+query.QueryTerm+"%")
	}

	if query.GradeId != 0 {
		db = db.Where("grade_id = ?", query.GradeId)
	}

	total := db.WithContext(ctx).Count(&totalClasses)

	if total.Error != nil {
		return classes, 0, total.Error
	}

	result := db.WithContext(ctx).Scopes(bootstrap.QueryScope(&paginator)).
		Preload("Teacher").
		Preload("Subject").
		Preload("Room").
		Find(&classes)

	return classes, int(totalClasses), result.Error
}

func (r classRepository) Update(payload domain.ClassUpdatePayload) (domain.ClassUpdatePayload, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	class, err := r.GetById(payload.ID)

	if err != nil {
		return domain.ClassUpdatePayload{}, err
	}

	result := r.db.WithContext(ctx).Table("classes").Where("id = ?", class.ID).Updates(&payload)

	return payload, result.Error
}

func (r classRepository) Delete(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	result := r.db.WithContext(ctx).Delete(&domain.Class{}, id)

	return result.Error
}

func (r classRepository) GetById(id int) (domain.Class, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var class domain.Class

	result := r.db.WithContext(ctx).Where("id = ?", id).First(&class)

	return class, result.Error
}
