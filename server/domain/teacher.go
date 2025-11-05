package domain

type Teacher struct {
	Base
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}
