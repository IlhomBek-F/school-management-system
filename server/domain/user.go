package domain

type User struct {
	Base
	Username     string `json:"username"`
	PasswordHash string `json:"-"`
}
