package repository

import (
	"school/bootstrap"
	"school/domain"

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
	Db *gorm.DB
}

func NewStudentRepository(db *gorm.DB) StudentRepository {
	return studentRepository{Db: db}
}

func (r studentRepository) Create(payload domain.StudentCreatePayload) (domain.Student, error) {
	student := domain.Student{
		PersonalInfo: payload.PersonalInfo,
		AcademicInfo: payload.AcademicInfo,
	}
	result := r.Db.Create(&student)

	return student, result.Error
}

func (r studentRepository) Update(payload domain.StudentUpdatePayload) (domain.Student, error) {
	student, err := r.GetById(payload.ID)

	if err != nil {
		return domain.Student{}, err
	}

	result := r.Db.Where("id = ?", student.ID).Updates(&payload)

	return payload, result.Error
}

func (r studentRepository) Delete(id int) error {
	result := r.Db.Delete(domain.Student{}, id)

	return result.Error
}

func (r studentRepository) GetList(query domain.StudentQuery) ([]domain.Student, int, error) {
	var students []domain.Student
	var total int64
	paginator := domain.Paginator{PerPage: query.PerPage, Page: query.Page}

	db := r.Db.Model(&students)

	if query.QueryTerm != "" {
		db = db.Where("first_name LIKE  ? OR last_name LIKE  ?", "%"+query.QueryTerm+"%", "%"+query.QueryTerm+"%")
	}

	if query.GradeId != 0 {
		db = db.Where("grade_id = ?", query.GradeId)
	}

	totalResult := db.Count(&total)
	result := db.Scopes(bootstrap.QueryScope(&paginator)).Find(&students)

	if result.Error != nil {
		return []domain.Student{}, 0, result.Error
	}

	if totalResult.Error != nil {
		return []domain.Student{}, 0, totalResult.Error
	}

	return students, int(total), nil
}

func (r studentRepository) GetById(id int) (domain.Student, error) {
	var student domain.Student
	result := r.Db.Where("id = ?", id).First(&student)

	return student, result.Error
}
