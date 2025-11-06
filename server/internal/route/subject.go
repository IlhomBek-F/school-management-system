package route

import (
	"school/bootstrap"
	"school/internal/controller"
	"school/internal/repository"
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

func NewSubjectRouter(app bootstrap.Application, routerGroup *gin.RouterGroup) {
	subjectRepository := repository.NewSubjectRepository(&app.Db)
	subjectUsecase := usecase.NewSubjectUsecase(subjectRepository)
	subjectController := controller.SubjectController{SubjectUsecase: subjectUsecase}

	routerGroup.POST("/subject/create", subjectController.CreateSubject)
	routerGroup.GET("/subject/list", subjectController.GetSubjectList)
	routerGroup.GET("/subject/:subject_id", subjectController.GetSubjectById)
	routerGroup.DELETE("/subject/:subject_id", subjectController.DeleteSubject)
	routerGroup.PUT("/subject/:subject_id", subjectController.UpdateSubject)
}
