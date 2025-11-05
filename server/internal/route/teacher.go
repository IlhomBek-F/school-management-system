package route

import (
	"school/bootstrap"
	"school/internal/controller"
	"school/internal/repository"
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

func NewTeacherRouter(app bootstrap.Application, routerGroup *gin.RouterGroup) {
	teacherRepository := repository.NewTeacherRepository(&app.Db)
	teacherUsecase := usecase.NewTeacherUsecase(teacherRepository)
	teacherContoller := controller.TeacherController{TeacherUsecase: teacherUsecase}

	routerGroup.GET("/teacher/:teacher_id", teacherContoller.GetTeacherById)
}
