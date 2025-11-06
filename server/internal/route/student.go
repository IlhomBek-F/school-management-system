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

	routerGroup.POST("/student/create", studentController.CreateStudent)
	routerGroup.GET("/student/list", studentController.GetStudentList)
	routerGroup.GET("/student/:student_id", studentController.GetStudentById)
	routerGroup.DELETE("/student/:student_id", studentController.DeleteStudent)
	routerGroup.PUT("/student/:student_id", studentController.UpdateStudent)
}
