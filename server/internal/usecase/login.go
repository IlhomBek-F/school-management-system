package usecase

import (
	"school/domain"
	"school/internal/repository"
	"school/internal/service"
	"strconv"

	"golang.org/x/crypto/bcrypt"
)

type UserUsecase interface {
	Login(payload domain.LoginRequest) (string, string, error)
	RefreshToken(refreshToken string, tokenSecret string) (domain.AuthToken, error)
}

type userUsecase struct {
	userRespository repository.UserRepository
	tokenService    service.TokenService
}

func NewUserUsecase(userRepo repository.UserRepository, tokenService service.TokenService) UserUsecase {
	return userUsecase{userRespository: userRepo, tokenService: tokenService}
}

func (u userUsecase) Login(payload domain.LoginRequest) (string, string, error) {
	user, err := u.userRespository.GetByUsername(payload.Username)

	if err != nil {
		return "", "", domain.ErrUserNotFound
	}

	if bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(payload.Password)) != nil {
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

func (u userUsecase) RefreshToken(token string, tokenSecret string) (domain.AuthToken, error) {
	tokenClaim, err := service.ParseToken(token, tokenSecret)

	if err != nil {
		return domain.AuthToken{}, err
	}

	userId, err := strconv.Atoi(tokenClaim.Subject)

	user, err := u.userRespository.GetByID(userId)

	if err != nil {
		return domain.AuthToken{}, err
	}

	accessToken, accessTokenErr := u.tokenService.GenerateToken(user)

	if accessTokenErr != nil {
		return domain.AuthToken{}, domain.ErrGenerateAccessToken
	}

	return domain.AuthToken{AccessToken: accessToken}, nil
}
