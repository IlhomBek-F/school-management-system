package domain

type Base struct {
	ID         int    `json:"id"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
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
