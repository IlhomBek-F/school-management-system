package route

import (
	"school/bootstrap"
	"school/internal/controller"
	"school/internal/repository"
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

func NewFacilityRoute(app bootstrap.Application, routerGroup *gin.RouterGroup) {
	facilityRepo := repository.NewFacilityRepository(&app.Db)
	facilityUsecase := usecase.NewFacilityUsecase(facilityRepo)
	facilityController := controller.FacilityController{FacilityUsecase: facilityUsecase}

	routerGroup.GET("/facility/list", facilityController.GetFacilityList)
	routerGroup.POST("/facility/create", facilityController.CreateFacility)
	routerGroup.GET("/facility/:facility_id", facilityController.GetFacilityById)
	routerGroup.PUT("/facility/update", facilityController.UpdateFacility)
	routerGroup.DELETE("/facility/:facility_id", facilityController.DeleteFacility)
}
