package domain

import "time"

type Base struct {
	ID        int       `json:"id"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime"`
	DeletedAt time.Time `json:"deleted_at" gorm:"gorm.DeletedAt"`
}

type ErrorResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

type SuccessResponseWithData[T any] struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    T      `json:"data"`
}

type SuccessResponseWithMeta[T any] struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    T      `json:"data"`
	Meta    Meta   `json:"meta"`
}

type Meta struct {
	Total       int `json:"total"`
	PerPage     int `json:"per_page"`
	CurrentPage int `json:"current_page"`
}

type SuccessRes struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

type Paginator struct {
	PerPage int `form:"per_page"`
	Page    int `form:"page"`
}
