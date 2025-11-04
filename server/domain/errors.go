package domain

import "errors"

var (
	ErrUserNotFound      = errors.New("user not found")
	ErrInvalidCredential = errors.New("invalid credentials")
	ErrInternalServer    = errors.New("internal server error")
)
