package route

import (
	"school/bootstrap"
	"school/internal/controller"
	"school/internal/repository"
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

func NewStudentRouter(app bootstrap.Application, routerGroup *gin.RouterGroup) {
	studentRepository := repository.NewStudentRepository(&app.Db)
	studentUsecase := usecase.NewStudentUsecase(studentRepository)
	studentController := controller.StudentController{StudentUsecase: studentUsecase}

	routerGroup.GET("/student/:student_id", studentController.GetStudentById)
}
