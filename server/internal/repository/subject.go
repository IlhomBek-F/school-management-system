package repository

import (
	"school/domain"

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
	subject := domain.Subject{
		Name:        payload.Name,
		Description: payload.Description,
	}

	result := r.db.Create(&subject)

	return subject, result.Error
}

func (r subjectRepository) GetList() ([]domain.Subject, error) {
	var subjects []domain.Subject
	result := r.db.Find(&subjects)

	return subjects, result.Error
}

func (r subjectRepository) GetByID(id int) (domain.Subject, error) {
	var subject domain.Subject
	result := r.db.Where("id = ?", id).First(&subject)

	return subject, result.Error
}

func (r subjectRepository) Update(payload domain.UpdateSubjectPayload) (domain.Subject, error) {
	result := r.db.Updates(&payload)
	return payload, result.Error
}

func (r subjectRepository) Delete(id int) error {
	return r.db.Delete(domain.Subject{}, id).Error
}
