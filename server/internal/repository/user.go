package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) domain.UserRepository {
	return userRepository{db: db}
}

func (r userRepository) Create(user domain.User) error {
	return nil
}
func (r userRepository) GetByID(id int) (domain.User, error) {
	return domain.User{}, nil
}
func (r userRepository) GetByUsername(username string) (domain.User, error) {
	return domain.User{}, nil
}
func (r userRepository) Update(user domain.User) error {
	return nil
}
func (r userRepository) Delete(id int) error {
	return nil
}
