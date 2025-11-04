package route

import (
	"school/bootstrap"
	"school/internal/controller"
	"school/internal/repository"
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

func NewLoginRoute(app bootstrap.Application, routerGroupe *gin.RouterGroup) {
	userRepo := repository.NewUserRepository(&app.Db)
	userUsecase := usecase.NewUserUsecase(userRepo, app)
	loginControler := controller.LoginController{LoginUsecase: userUsecase, Env: *app.Env}

	routerGroupe.POST("/auth/login", loginControler.Login)
}
