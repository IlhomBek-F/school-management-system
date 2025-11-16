package route

import (
	"school/bootstrap"
	"school/internal/controller"
	"school/internal/repository"
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

func NewStatsRoute(app bootstrap.Application, routerGroup *gin.RouterGroup) {
	statsRepo := repository.NewStatsRepository(&app.Db)
	statsUsecase := usecase.NewStatsUsecase(statsRepo)
	statsController := controller.StatsController{StatsUsecase: statsUsecase}

	routerGroup.GET("/stats/quick", statsController.GetQuickStats)
	routerGroup.GET("/stats/room", statsController.GetRoomStats)
	routerGroup.GET("/stats/student", statsController.GetStudentStats)
}
