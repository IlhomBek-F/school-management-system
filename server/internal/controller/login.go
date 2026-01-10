package controller

import (
	"net/http"
	"school/bootstrap"
	"school/domain"
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

type LoginController struct {
	LoginUsecase usecase.UserUsecase
	Env          bootstrap.Env
}

// Login in godoc
//
//	@Summary		Login in to account
//	@Description	Login in to account
//	@Tags			Authentication
//	@Accept			json
//	@Produce		json
//	@Param			payload	body		domain.LoginRequest	true "User credentials"
//	@Success		201		{object}	domain.LoginRes		"Logged in"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/auth/login [post]
func (lc LoginController) Login(c *gin.Context) {
	var payload domain.LoginRequest

	err := c.ShouldBind(&payload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	accessToken, refreshToken, err := lc.LoginUsecase.Login(payload)

	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.ErrorResponseMap[err])
		return
	}

	successRes := domain.LoginRes{
		Status:  http.StatusOK,
		Message: "Success",
		Data: domain.AuthToken{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		},
	}

	c.JSON(http.StatusOK, successRes)
}

// Login in godoc
//
//	@Summary		Refresh token
//	@Description	Refresh token
//	@Tags			Authentication
//	@Accept			json
//	@Produce		json
//	@Param			payload	body		domain.LoginRequest	true "User credentials"
//	@Success		201		{object}	domain.LoginRes		"Logged in"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/auth/refresh_token [post]
func (lc LoginController) RefreshToken(c *gin.Context) {
	var payload domain.AuthToken

	err := c.ShouldBind(&payload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	authToken, err := lc.LoginUsecase.RefreshToken(payload.RefreshToken, lc.Env.REFRESH_TOKEN_SECRET)

	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.ErrorResponseMap[err])
		return
	}

	successRes := domain.LoginRes{
		Status:  http.StatusOK,
		Message: "Success",
		Data:    authToken,
	}

	c.JSON(http.StatusOK, successRes)
}
