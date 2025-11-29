package repository

import (
	"school/bootstrap"
	"school/domain"

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
	Db *gorm.DB
}

func NewTeacherRepository(db *gorm.DB) TeacherRepository {
	return teacherRepository{Db: db}
}

func (r teacherRepository) GetList(query domain.TeacherQuery) ([]domain.Teacher, int, error) {
	var total int64
	var teachers []domain.Teacher
	paginator := domain.Paginator{PerPage: query.PerPage, Page: query.Page}

	db := r.Db.Model(&teachers)

	if query.DepartmentId != 0 {
		db = db.Where("department_id = ?", query.DepartmentId)
	}

	if query.QueryTerm != "" {
		db = db.Where("first_name ILIKE ?", "%"+query.QueryTerm+"%")
	}

	resultCount := db.Count(&total)

	result := db.Scopes(bootstrap.QueryScope(&paginator)).
		Preload("Subjects").
		Find(&teachers)

	if resultCount.Error != nil {
		return []domain.Teacher{}, 0, resultCount.Error
	}

	return teachers, int(total), result.Error
}

func (r teacherRepository) Create(payload domain.TeacherCreatePayload) (domain.Teacher, error) {
	teacher := domain.Teacher{
		PersonalInfo:     payload.PersonalInfo,
		ProfessionalInfo: payload.ProfessionalInfo,
		EmploymentDetail: payload.EmploymentDetail,
	}

	result := r.Db.Create(&teacher)

	return teacher, result.Error
}

func (r teacherRepository) Update(payload domain.TeacherUpdatePayload) (domain.Teacher, error) {
	teacher, err := r.GetById(payload.ID)

	if err != nil {
		return domain.Teacher{}, err
	}

	result := r.Db.Model(&teacher).Select("*").Updates(&payload)

	if result.Error != nil {
		return domain.Teacher{}, result.Error
	}

	err = r.Db.Model(&teacher).Association("Subjects").Replace(payload.ProfessionalInfo.Subjects)

	if err != nil {
		return domain.Teacher{}, err
	}

	return r.GetById(payload.ID)
}

func (r teacherRepository) Delete(id int) error {
	result := r.Db.Delete(&domain.Teacher{}, id)

	return result.Error
}

func (r teacherRepository) GetById(id int) (domain.Teacher, error) {
	var teacher domain.Teacher

	result := r.Db.Where("id = ?", id).Preload("Subjects").First(&teacher)

	return teacher, result.Error
}
