package repository

import (
	"context"
	"school/domain"
	"time"

	"gorm.io/gorm"
)

type UserRepository interface {
	Create(user domain.User) error
	GetByID(id int) (domain.User, error)
	GetByUsername(username string) (domain.User, error)
	Update(user domain.User) error
	Delete(id int) error
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return userRepository{db: db}
}

func (r userRepository) Create(user domain.User) error {
	return nil
}

func (r userRepository) GetByID(id int) (domain.User, error) {
	context, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var user domain.User
	result := r.db.WithContext(context).Where("id = ?", id).First(&user)

	return user, result.Error
}

func (r userRepository) GetByUsername(username string) (domain.User, error) {
	context, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var user domain.User
	result := r.db.WithContext(context).Where("username = ?", username).First(&user)

	return user, result.Error
}

func (r userRepository) Update(user domain.User) error {
	return nil
}
func (r userRepository) Delete(id int) error {
	return nil
}
