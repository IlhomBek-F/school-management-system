package route

import (
	"school/bootstrap"
	"school/internal/controller"
	"school/internal/repository"
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

func NewRoomRouter(app bootstrap.Application, routerGroup *gin.RouterGroup) {
	roomRepository := repository.NewRoomRepository(&app.Db)
	roomUsecase := usecase.NewRoomUsecase(roomRepository)
	roomController := controller.RoomController{RoomUsecase: roomUsecase}

	routerGroup.POST("/room/create", roomController.CreateRoom)
	routerGroup.GET("/room/list", roomController.GetRoomList)
	routerGroup.GET("/room/:room_id", roomController.GetRoomById)
	routerGroup.DELETE("/room/:room_id", roomController.DeleteRoom)
	routerGroup.PUT("/room/:room_id", roomController.UpdateRoom)
}
