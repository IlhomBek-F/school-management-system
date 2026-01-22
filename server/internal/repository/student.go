package repository

import (
	"school/bootstrap"
	"school/domain"
	"time"

	"golang.org/x/net/context"
	"gorm.io/gorm"
)

type StudentRepository interface {
	Create(payload domain.StudentCreatePayload) (domain.Student, error)
	Update(payload domain.StudentUpdatePayload) (domain.Student, error)
	GetById(id int) (domain.Student, error)
	GetList(query domain.StudentQuery) ([]domain.Student, int, error)
	Delete(id int) error
}

type studentRepository struct {
	db *gorm.DB
}

func NewStudentRepository(db *gorm.DB) StudentRepository {
	return studentRepository{db: db}
}

func (r studentRepository) Create(payload domain.StudentCreatePayload) (domain.Student, error) {
	cxt, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	student := domain.Student{
		PersonalInfo: payload.PersonalInfo,
		AcademicInfo: payload.AcademicInfo,
	}
	result := r.db.WithContext(cxt).Create(&student)

	return student, result.Error
}

func (r studentRepository) Update(payload domain.StudentUpdatePayload) (domain.Student, error) {
	cxt, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	student, err := r.GetById(payload.ID)

	if err != nil {
		return domain.Student{}, err
	}

	result := r.db.WithContext(cxt).Where("id = ?", student.ID).Updates(&payload)

	return payload, result.Error
}

func (r studentRepository) Delete(id int) error {
	cxt, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	result := r.db.WithContext(cxt).Delete(domain.Student{}, id)

	return result.Error
}

func (r studentRepository) GetList(query domain.StudentQuery) ([]domain.Student, int, error) {
	cxt, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var students []domain.Student
	var total int64
	paginator := domain.Paginator{PerPage: query.PerPage, Page: query.Page}

	db := r.db.Model(&students)

	if query.QueryTerm != "" {
		db = db.Where("first_name LIKE  ? OR last_name LIKE  ?", "%"+query.QueryTerm+"%", "%"+query.QueryTerm+"%")
	}

	if query.GradeId != 0 {
		db = db.Where("grade_id = ?", query.GradeId)
	}

	totalResult := db.WithContext(cxt).Count(&total)
	result := db.WithContext(cxt).Scopes(bootstrap.QueryScope(&paginator)).Find(&students)

	if result.Error != nil {
		return []domain.Student{}, 0, result.Error
	}

	if totalResult.Error != nil {
		return []domain.Student{}, 0, totalResult.Error
	}

	return students, int(total), nil
}

func (r studentRepository) GetById(id int) (domain.Student, error) {
	cxt, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var student domain.Student
	result := r.db.WithContext(cxt).Where("id = ?", id).First(&student)

	return student, result.Error
}
