package controller

import (
	"errors"
	"net/http"
	"school/bootstrap"
	"school/domain"

	"github.com/gin-gonic/gin"
)

type LoginController struct {
	LoginUsecase domain.UserUsecase
	Env          bootstrap.Env
}

func (lc LoginController) Login(c *gin.Context) {
	var payload domain.LoginRequest

	err := c.ShouldBind(&payload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Error: err.Error()})
		return
	}

	accessToken, refreshToken, err := lc.LoginUsecase.Login(payload)

	if err != nil {
		switch {
		case errors.Is(err, domain.ErrUserNotFound):
			c.JSON(http.StatusNotFound, domain.ErrorResponse{Status: http.StatusNotFound, Error: err.Error()})
			return
		case errors.Is(err, domain.ErrInvalidCredential):
			c.JSON(http.StatusUnauthorized, domain.ErrorResponse{Status: http.StatusUnauthorized, Error: err.Error()})
			return
		default:
			c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Status: http.StatusInternalServerError, Error: domain.ErrInternalServer.Error()})
			return
		}
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
