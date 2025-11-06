package controller

import (
	"net/http"
	"school/domain"
	"school/internal/usecase"
	"strconv"

	"github.com/gin-gonic/gin"
)

type RoomTypeController struct {
	RoomTypeUsecase usecase.RoomTypeUsecase
}

// Get roomType list godoc
//
//	@Summary		Get roomType list
//	@Description	Get roomType list
//	@Tags			RoomType
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Success		201		{object}	domain.RoomTypeListRes "room_types"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/room_type/list [get]
func (s RoomTypeController) GetRoomTypeList(c *gin.Context) {
	roomTypes, err := s.RoomTypeUsecase.GetList()

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.RoomTypeListRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    roomTypes,
		Meta: domain.Meta{
			Total:       0,
			PerPage:     10,
			CurrentPage: 1,
		},
	}

	c.JSON(http.StatusCreated, successRes)
}

// Create roomType godoc
//
//	@Summary		Create roomType
//	@Description	Create roomType
//	@Tags			RoomType
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.RoomTypeCreatePayload	true "roomType"
//	@Success		201		{object}	domain.RoomTypeSuccessRes		"Created new roomType"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/room_type/create [post]
func (s RoomTypeController) CreateRoomType(c *gin.Context) {
	var roomTypeCreatePayload domain.RoomTypeCreatePayload

	err := c.ShouldBind(&roomTypeCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	roomType, err := s.RoomTypeUsecase.Create(roomTypeCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.RoomTypeSuccessRes{
		Status:  http.StatusCreated,
		Message: "success",
		Data:    roomType,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Update roomType godoc
//
//	@Summary		Update roomType
//	@Description	Update roomType
//	@Tags			RoomType
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.RoomTypeUpdatePayload	true "roomType"
//	@Success		201		{object}	domain.RoomTypeSuccessRes		"Updated roomType"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/room_type/update [put]
func (s RoomTypeController) UpdateRoomType(c *gin.Context) {
	var roomTypeUpdatePayload domain.RoomTypeUpdatePayload

	err := c.ShouldBind(&roomTypeUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	updatedRoomType, err := s.RoomTypeUsecase.Update(roomTypeUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.RoomTypeSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    updatedRoomType,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Get roomType by id godoc
//
//	@Summary		Get roomType by id
//	@Description	Get roomType by id
//	@Tags			RoomType
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			room_type_id	path	int		true "room_type_id"
//	@Success		201		{object}	domain.RoomTypeSuccessRes "roomType"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/room_type/{room_type_id} [get]
func (s RoomTypeController) GetRoomTypeById(c *gin.Context) {
	roomTypeId, cnvErr := strconv.Atoi(c.Param("room_type_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	roomType, err := s.RoomTypeUsecase.GetById(roomTypeId)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.RoomTypeSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    roomType,
	}

	c.JSON(http.StatusBadRequest, successRes)
}

// Delete roomType godoc
//
//	@Summary		Delete roomType
//	@Description	Delete roomType
//	@Tags			RoomType
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			room_type_id	path	int		true "room_type_id"
//	@Success		201		{object}	domain.SuccessRes "RoomType"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/room_type/{room_type_id} [delete]
func (s RoomTypeController) DeleteRoomType(c *gin.Context) {
	roomTypeId, cnvErr := strconv.Atoi(c.Param("room_type_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	err := s.RoomTypeUsecase.Delete(roomTypeId)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[err])
		return
	}

	successRes := domain.SuccessRes{
		Status:  http.StatusOK,
		Message: "success",
	}

	c.JSON(http.StatusBadRequest, successRes)
}
