package service

import "school/domain"

type TokenService interface {
	GenerateToken(user domain.User) string
	GenerateRefreshToken(user domain.User) string
}

type tokenService struct {
	accessTokenSecret  string
	refreshTokenSecret string
}

func NewTokenService(accessTokenSecret, refreshTokenSecret string) TokenService {
	return tokenService{accessTokenSecret: accessTokenSecret, refreshTokenSecret: refreshTokenSecret}
}

func (s tokenService) GenerateToken(user domain.User) string {
	return ""
}

func (s tokenService) GenerateRefreshToken(user domain.User) string {
	return ""
}
