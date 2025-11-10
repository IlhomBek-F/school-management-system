package controller

import (
	"net/http"
	"school/domain"
	"school/internal/usecase"
	"strconv"

	"github.com/gin-gonic/gin"
)

type RoomController struct {
	RoomUsecase usecase.RoomUsecase
}

// Get room list godoc
//
//	@Summary		Get room list
//	@Description	Get room list
//	@Tags			Room
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Success		201		{object}	domain.RoomListRes "rooms"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/room/list [get]
func (s RoomController) GetRoomList(c *gin.Context) {
	rooms, err := s.RoomUsecase.GetList()

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.RoomListRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    rooms,
		Meta: domain.Meta{
			Total:       0,
			PerPage:     10,
			CurrentPage: 1,
		},
	}

	c.JSON(http.StatusCreated, successRes)
}

// Create room godoc
//
//	@Summary		Create room
//	@Description	Create room
//	@Tags			Room
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.RoomCreatePayload	true "room"
//	@Success		201		{object}	domain.RoomSuccessRes		"Created new room"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/room/create [post]
func (s RoomController) CreateRoom(c *gin.Context) {
	var roomCreatePayload domain.RoomCreatePayload

	err := c.ShouldBind(&roomCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	room, err := s.RoomUsecase.Create(roomCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.RoomSuccessRes{
		Status:  http.StatusCreated,
		Message: "success",
		Data:    room,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Update room godoc
//
//	@Summary		Update room
//	@Description	Update room
//	@Tags			Room
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.RoomUpdatePayload	true "room"
//	@Success		201		{object}	domain.RoomSuccessRes		"Updated room"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/room/update [put]
func (s RoomController) UpdateRoom(c *gin.Context) {
	var roomUpdatePayload domain.RoomUpdatePayload

	err := c.ShouldBind(&roomUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	updatedRoom, err := s.RoomUsecase.Update(roomUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.RoomSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    updatedRoom,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Get room by id godoc
//
//	@Summary		Get room by id
//	@Description	Get room by id
//	@Tags			Room
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			room_id	path	int		true "room_id"
//	@Success		201		{object}	domain.RoomSuccessRes "room"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/room/{room_id} [get]
func (s RoomController) GetRoomById(c *gin.Context) {
	roomId, cnvErr := strconv.Atoi(c.Param("room_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	room, err := s.RoomUsecase.GetById(roomId)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.RoomSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    room,
	}

	c.JSON(http.StatusBadRequest, successRes)
}

// Delete room godoc
//
//	@Summary		Delete room
//	@Description	Delete room
//	@Tags			Room
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			room_id	path	int		true "room_id"
//	@Success		201		{object}	domain.SuccessRes "Room"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/room/{room_id} [delete]
func (s RoomController) DeleteRoom(c *gin.Context) {
	roomId, cnvErr := strconv.Atoi(c.Param("room_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	err := s.RoomUsecase.Delete(roomId)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[err])
		return
	}

	successRes := domain.SuccessRes{
		Status:  http.StatusOK,
		Message: "success",
	}

	c.JSON(http.StatusOK, successRes)
}
