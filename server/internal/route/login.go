package route

import (
	"school/bootstrap"
	"school/internal/controller"
	"school/internal/repository"
	"school/internal/service"
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

func NewLoginRoute(app bootstrap.Application, routerGroupe *gin.RouterGroup) {
	userRepo := repository.NewUserRepository(&app.Db)
	tokenService := service.NewTokenService(app.Env.ACCESS_TOKEN_SECRET, app.Env.REFRESH_TOKEN_SECRET)
	userUsecase := usecase.NewUserUsecase(userRepo, tokenService)
	loginControler := controller.LoginController{LoginUsecase: userUsecase, Env: *app.Env}

	routerGroupe.POST("/auth/login", loginControler.Login)
}
