package domain

type User struct {
	Base
	Username     string `json:"username"`
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	DateOfBirth  string `json:"date_of_birth"`
	PasswordHash string `json:"-"`
}

type UserRepository interface {
	Create(user User) error
	GetByID(id int) (User, error)
	GetByUsername(username string) (User, error)
	Update(user User) error
	Delete(id int) error
}
