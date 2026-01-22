package repository

import (
	"context"
	"school/bootstrap"
	"school/domain"
	"time"

	"gorm.io/gorm"
)

type TeacherRepository interface {
	Create(payload domain.TeacherCreatePayload) (domain.Teacher, error)
	Update(payload domain.TeacherUpdatePayload) (domain.Teacher, error)
	Delete(id int) error
	GetById(id int) (domain.Teacher, error)
	GetList(query domain.TeacherQuery) ([]domain.Teacher, int, error)
}

type teacherRepository struct {
	db *gorm.DB
}

func NewTeacherRepository(db *gorm.DB) TeacherRepository {
	return teacherRepository{db: db}
}

func (r teacherRepository) GetList(query domain.TeacherQuery) ([]domain.Teacher, int, error) {
	cxt, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var total int64
	var teachers []domain.Teacher
	paginator := domain.Paginator{PerPage: query.PerPage, Page: query.Page}

	db := r.db.Model(&teachers)

	if query.DepartmentId != 0 {
		db = db.Where("department_id = ?", query.DepartmentId)
	}

	if query.QueryTerm != "" {
		db = db.Where("first_name ILIKE ?", "%"+query.QueryTerm+"%")
	}

	resultCount := db.WithContext(cxt).Count(&total)

	result := db.WithContext(cxt).Scopes(bootstrap.QueryScope(&paginator)).
		Preload("Subjects").
		Find(&teachers)

	if resultCount.Error != nil {
		return []domain.Teacher{}, 0, resultCount.Error
	}

	return teachers, int(total), result.Error
}

func (r teacherRepository) Create(payload domain.TeacherCreatePayload) (domain.Teacher, error) {
	cxt, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	teacher := domain.Teacher{
		PersonalInfo:     payload.PersonalInfo,
		ProfessionalInfo: payload.ProfessionalInfo,
		EmploymentDetail: payload.EmploymentDetail,
	}

	result := r.db.WithContext(cxt).Create(&teacher)

	return teacher, result.Error
}

func (r teacherRepository) Update(payload domain.TeacherUpdatePayload) (domain.Teacher, error) {
	cxt, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	teacher, err := r.GetById(payload.ID)

	if err != nil {
		return domain.Teacher{}, err
	}

	result := r.db.WithContext(cxt).Model(&teacher).Select("*").Updates(&payload)

	if result.Error != nil {
		return domain.Teacher{}, result.Error
	}

	err = r.db.WithContext(cxt).Model(&teacher).Association("Subjects").Replace(payload.ProfessionalInfo.Subjects)

	if err != nil {
		return domain.Teacher{}, err
	}

	return r.GetById(payload.ID)
}

func (r teacherRepository) Delete(id int) error {
	cxt, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	result := r.db.WithContext(cxt).Delete(&domain.Teacher{}, id)

	return result.Error
}

func (r teacherRepository) GetById(id int) (domain.Teacher, error) {
	cxt, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var teacher domain.Teacher

	result := r.db.WithContext(cxt).Where("id = ?", id).Preload("Subjects").First(&teacher)

	return teacher, result.Error
}
