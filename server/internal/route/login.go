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
	tokenService := service.NewTokenService(app.Env)
	userUsecase := usecase.NewUserUsecase(userRepo, tokenService)
	loginControler := controller.LoginController{LoginUsecase: userUsecase, Env: *app.Env}

	routerGroupe.POST("/auth/login", loginControler.Login)
}
