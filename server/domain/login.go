package domain

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" bionding:"required"`
}

type LoginResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}
