package controller

import (
	"net/http"
	"school/domain"
	"school/internal/usecase"
	"strconv"

	"github.com/gin-gonic/gin"
)

type BuildingController struct {
	BuildingUsecase usecase.BuildingUsecase
}

// Get building list godoc
//
//	@Summary		Get building list
//	@Description	Get building list
//	@Tags			Building
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Success		201		{object}	domain.BuildingSuccessRes "building"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/building/list [get]
func (s BuildingController) GetBuildingList(c *gin.Context) {
	building, err := s.BuildingUsecase.GetList()

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.BuildingListRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    building,
		Meta: domain.Meta{
			Total:       0,
			PerPage:     10,
			CurrentPage: 1,
		},
	}

	c.JSON(http.StatusCreated, successRes)
}

// Create building godoc
//
//	@Summary		Create building
//	@Description	Create building
//	@Tags			Building
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.BuildingCreatePayload	true "building"
//	@Success		201		{object}	domain.BuildingSuccessRes		"Created new building"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/building/create [post]
func (s BuildingController) CreateBuilding(c *gin.Context) {
	var buildingCreatePayload domain.BuildingCreatePayload

	err := c.ShouldBind(&buildingCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	building, err := s.BuildingUsecase.Create(buildingCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.BuildingSuccessRes{
		Status:  http.StatusCreated,
		Message: "success",
		Data:    building,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Update building godoc
//
//	@Summary		Update building
//	@Description	Update building
//	@Tags			Building
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.BuildingUpdatePayload	true "building"
//	@Success		201		{object}	domain.BuildingSuccessRes		"Updated bulding"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/building/update [put]
func (s BuildingController) UpdateBuilding(c *gin.Context) {
	var buildingUpdatePayload domain.BuildingUpdatePayload

	err := c.ShouldBind(&buildingUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	updatedBuilding, err := s.BuildingUsecase.Update(buildingUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.BuildingSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    updatedBuilding,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Get building by id godoc
//
//	@Summary		Get building by id
//	@Description	Get building by id
//	@Tags			Building
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			building_id	path	int		true "building_id"
//	@Success		201		{object}	domain.BuildingSuccessRes "building"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/building/{building_id} [get]
func (s BuildingController) GetBuildingById(c *gin.Context) {
	buildingId, cnvErr := strconv.Atoi(c.Param("building_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	building, err := s.BuildingUsecase.GetById(buildingId)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.BuildingSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    building,
	}

	c.JSON(http.StatusBadRequest, successRes)
}

// Delete building godoc
//
//	@Summary		Delete building
//	@Description	Delete building
//	@Tags			Building
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			building_id	path	int		true "building_id"
//	@Success		201		{object}	domain.SuccessRes "building"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/building/{building_id} [delete]
func (s BuildingController) DeleteBuilding(c *gin.Context) {
	buildingId, cnvErr := strconv.Atoi(c.Param("building_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	err := s.BuildingUsecase.Delete(buildingId)

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
