package usecase

import (
	"school/domain"
	"school/internal/service"

	"golang.org/x/crypto/bcrypt"
)

type userUsecase struct {
	userRespository domain.UserRepository
	tokenService    service.TokenService
}

func NewUserUsecase(userRepo domain.UserRepository, tokenService service.TokenService) domain.UserUsecase {
	return userUsecase{userRespository: userRepo, tokenService: tokenService}
}

func (u userUsecase) Login(payload domain.LoginRequest) (string, string, error) {
	user, err := u.userRespository.GetByUsername(payload.Username)

	if err != nil {
		return "", "", domain.ErrUserNotFound
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password)) != nil {
		return "", "", domain.ErrInvalidCredential
	}

	accessToken, accessTokenErr := u.tokenService.GenerateToken(user)
	refreshToken, refreshTokenErr := u.tokenService.GenerateRefreshToken(user)

	if accessTokenErr != nil {
		return "", "", domain.ErrGenerateAccessToken
	}

	if refreshTokenErr != nil {
		return "", "", domain.ErrGeneratRefreshToken
	}

	return accessToken, refreshToken, nil
}
