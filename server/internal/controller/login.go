package controller

import (
	"net/http"
	"school/bootstrap"
	"school/domain"

	"github.com/gin-gonic/gin"
)

type LoginController struct {
	LoginUsecase domain.UserUsecase
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
//	@Success		201		{object}	domain.LoginResponse		"Logged in"
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

	successRes := domain.SuccessResponseWithData[domain.LoginResponse]{
		Status:  http.StatusOK,
		Message: "Success",
		Data: domain.LoginResponse{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		},
	}

	c.JSON(http.StatusOK, successRes)
}
