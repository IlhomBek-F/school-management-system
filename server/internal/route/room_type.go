package route

import (
	"school/bootstrap"
	"school/internal/controller"
	"school/internal/repository"
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

func NewRoomTypeRouter(app bootstrap.Application, routerGroup *gin.RouterGroup) {
	roomTypeRepository := repository.NewRoomTypeRepository(&app.Db)
	roomTypeUsecase := usecase.NewRoomTypeUsecase(roomTypeRepository)
	roomTypeController := controller.RoomTypeController{RoomTypeUsecase: roomTypeUsecase}

	routerGroup.POST("/room_type/create", roomTypeController.CreateRoomType)
	routerGroup.GET("/room_type/list", roomTypeController.GetRoomTypeList)
	routerGroup.GET("/room_type/:student_id", roomTypeController.GetRoomTypeById)
	routerGroup.DELETE("/room_type/:student_id", roomTypeController.DeleteRoomType)
	routerGroup.PUT("/room_type/:student_id", roomTypeController.UpdateRoomType)
}
