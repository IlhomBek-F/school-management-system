package route

import (
	"school/bootstrap"
	"school/internal/controller"
	"school/internal/repository"
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

func NewBuildingRoute(app bootstrap.Application, routerGroup *gin.RouterGroup) {
	buildingRepo := repository.NewBuildingRepository(&app.Db)
	buildingUsecase := usecase.NewBuildingUsecase(buildingRepo)
	buildingController := controller.BuildingController{BuildingUsecase: buildingUsecase}

	routerGroup.GET("/building/list", buildingController.GetBuildingList)
	routerGroup.POST("/building/create", buildingController.CreateBuilding)
	routerGroup.GET("/building/:building_id", buildingController.GetBuildingById)
	routerGroup.PUT("/building/update", buildingController.UpdateBuilding)
	routerGroup.DELETE("/building/:building_id", buildingController.DeleteBuilding)
}
