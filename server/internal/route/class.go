package route

import (
	"school/bootstrap"
	"school/internal/controller"
	"school/internal/repository"
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

func NewClassRoute(app bootstrap.Application, routerGroup *gin.RouterGroup) {
	classRepo := repository.NewClassRepository(&app.Db)
	classUsecase := usecase.NewClassUsecase(classRepo)
	classController := controller.ClassController{ClassUsecase: classUsecase}

	routerGroup.GET("/class/list", classController.GetClassList)
	routerGroup.POST("/class/create", classController.CreateClass)
	routerGroup.GET("/class/:class_id", classController.GetClassById)
	routerGroup.PUT("/class/update", classController.UpdateClass)
	routerGroup.DELETE("/class/:class_id", classController.DeleteClass)
}
