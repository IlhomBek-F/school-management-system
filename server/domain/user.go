package domain

type User struct {
	Base
	Username     string `json:"username"`
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	DateOfBirth  string `json:"date_of_birth"`
	PasswordHash string `json:"-"`
}
