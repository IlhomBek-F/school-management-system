package usecase

import (
	"school/bootstrap"
	"school/domain"

	"golang.org/x/crypto/bcrypt"
)

type userUsecase struct {
	userRespository domain.UserRepository
	app             bootstrap.Application
}

func NewUserUsecase(userRepo domain.UserRepository, app bootstrap.Application) domain.UserUsecase {
	return userUsecase{userRespository: userRepo, app: app}
}

func (u userUsecase) Login(payload domain.LoginRequest) (string, string, error) {
	user, err := u.userRespository.GetByUsername(payload.Username)

	if err != nil {
		return "", "", domain.ErrUserNotFound
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password)) != nil {
		return "", "", domain.ErrInvalidCredential
	}

	return "", "", nil
}
