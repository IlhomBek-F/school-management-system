package domain

import "time"

type Base struct {
	ID         int       `json:"id"`
	Created_at time.Time `json:"created_at" gorm:"autoCreateTime"`
	Updated_at time.Time `json:"updated_at" gorm:"autoUpdateTime"`
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

type Query struct {
	PerPage   int    `json:"per_page"`
	Page      int    `json:"page"`
	QueryTerm string `json:"query_term"`
}
