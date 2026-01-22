package repository

import (
	"context"
	"school/domain"
	"time"

	"gorm.io/gorm"
)

type SubjectRepository interface {
	Create(payload domain.CreateSubjectPayload) (domain.Subject, error)
	GetByID(id int) (domain.Subject, error)
	Update(payload domain.UpdateSubjectPayload) (domain.Subject, error)
	Delete(id int) error
	GetList() ([]domain.Subject, error)
}

type subjectRepository struct {
	db *gorm.DB
}

func NewSubjectRepository(db *gorm.DB) SubjectRepository {
	return subjectRepository{db: db}
}

func (r subjectRepository) Create(payload domain.CreateSubjectPayload) (domain.Subject, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	subject := domain.Subject{
		Name:        payload.Name,
		Description: payload.Description,
	}

	result := r.db.WithContext(ctx).Create(&subject)

	return subject, result.Error
}

func (r subjectRepository) GetList() ([]domain.Subject, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var subjects []domain.Subject
	result := r.db.WithContext(ctx).Find(&subjects)

	return subjects, result.Error
}

func (r subjectRepository) GetByID(id int) (domain.Subject, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var subject domain.Subject
	result := r.db.WithContext(ctx).Where("id = ?", id).First(&subject)

	return subject, result.Error
}

func (r subjectRepository) Update(payload domain.UpdateSubjectPayload) (domain.Subject, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	result := r.db.WithContext(ctx).Updates(&payload)
	return payload, result.Error
}

func (r subjectRepository) Delete(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	return r.db.WithContext(ctx).Delete(domain.Subject{}, id).Error
}
