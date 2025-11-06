package service

import (
	"errors"
	"school/bootstrap"
	"school/domain"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type CustomClaims struct {
	Role int
	jwt.RegisteredClaims
}

type TokenService interface {
	GenerateToken(user domain.User) (string, error)
	GenerateRefreshToken(user domain.User) (string, error)
}

type tokenService struct {
	env *bootstrap.Env
}

func NewTokenService(env *bootstrap.Env) TokenService {
	return tokenService{env: env}
}

func (s tokenService) GenerateToken(user domain.User) (string, error) {
	accessTokenClaims := s.CreateNewClaims(user.ID, 1, time.Duration(s.env.ACCESS_TOKEN_EXPIRY_HOUR)*time.Minute, "school")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, accessTokenClaims)

	tokenStr, err := token.SignedString([]byte(s.env.ACCESS_TOKEN_SECRET))

	if err != nil {
		return "", err
	}

	return tokenStr, nil
}

func (s tokenService) GenerateRefreshToken(user domain.User) (string, error) {
	refreshTokenClaims := s.CreateNewClaims(user.ID, 1, time.Duration(s.env.REFRESH_TOKEN_EXPIRY_HOUR)*time.Minute, "school")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshTokenClaims)
	tokenStr, err := token.SignedString([]byte(s.env.REFRESH_TOKEN_SECRET))

	if err != nil {
		return "", err
	}

	return tokenStr, nil
}

func (s tokenService) CreateNewClaims(userId, roleId int, exp time.Duration, iss string) CustomClaims {
	now := time.Now()

	return CustomClaims{
		Role: roleId,
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:   strconv.Itoa(userId),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(exp)),
			IssuedAt:  jwt.NewNumericDate(now),
			NotBefore: jwt.NewNumericDate(now),
			Audience:  jwt.ClaimStrings{iss},
		},
	}
}

func ValidateToken(token, tokenSecret string) (bool, error) {
	_, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}

		return []byte(tokenSecret), nil
	})

	if err != nil {
		return false, err
	}

	return true, nil
}

func ParseToken(tokenStr, secretKey string) (*CustomClaims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})

	if err != nil {
		return nil, domain.ErrParseToken
	}

	if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, domain.ErrParseToken
}
