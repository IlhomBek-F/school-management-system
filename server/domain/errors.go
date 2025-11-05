package domain

import (
	"errors"
	"net/http"
)

var (
	ErrUserNotFound        = errors.New("user not found")
	ErrInvalidCredential   = errors.New("invalid credentials")
	ErrInternalServer      = errors.New("internal server error")
	ErrGenerateAccessToken = errors.New("failed to generate an access token")
	ErrGeneratRefreshToken = errors.New("failed to generate refresh token token")
)

var ErrorResponseMap = map[error]ErrorResponse{
	ErrUserNotFound:        {Status: http.StatusNotFound, Error: ErrUserNotFound.Error()},
	ErrInvalidCredential:   {Status: http.StatusUnauthorized, Error: ErrInvalidCredential.Error()},
	ErrInternalServer:      {Status: http.StatusInternalServerError, Error: ErrInternalServer.Error()},
	ErrGenerateAccessToken: {Status: http.StatusInternalServerError, Error: ErrGenerateAccessToken.Error()},
	ErrGeneratRefreshToken: {Status: http.StatusInternalServerError, Error: ErrGeneratRefreshToken.Error()},
}
