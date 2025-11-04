package domain

type Base struct {
	ID         int    `json:"id"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
}

type ErrorResponse struct {
	Status int    `json:"status"`
	Error  string `json:"error"`
}

type SuccessResponseWithData[T any] struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Data    T      `json:"data"`
}
