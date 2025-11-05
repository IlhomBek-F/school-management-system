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
	ErrBadRequest          = errors.New("bad request")
)

var ErrorResponseMap = map[error]ErrorResponse{
	ErrUserNotFound:        {Status: http.StatusNotFound, Message: ErrUserNotFound.Error()},
	ErrInvalidCredential:   {Status: http.StatusUnauthorized, Message: ErrInvalidCredential.Error()},
	ErrInternalServer:      {Status: http.StatusInternalServerError, Message: ErrInternalServer.Error()},
	ErrGenerateAccessToken: {Status: http.StatusInternalServerError, Message: ErrGenerateAccessToken.Error()},
	ErrGeneratRefreshToken: {Status: http.StatusInternalServerError, Message: ErrGeneratRefreshToken.Error()},
	ErrBadRequest:          {Status: http.StatusBadRequest, Message: ErrBadRequest.Error()},
}
