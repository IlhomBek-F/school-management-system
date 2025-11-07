package controller

import (
	"net/http"
	"school/domain"
	"school/internal/usecase"
	"strconv"

	"github.com/gin-gonic/gin"
)

type FacilityController struct {
	FacilityUsecase usecase.FacilityUsecase
}

// Get facility list godoc
//
//	@Summary		Get facility list
//	@Description	Get facility list
//	@Tags			Facility
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Success		201		{object}	domain.FacilityListRes "facility"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/facility/list [get]
func (s FacilityController) GetFacilityList(c *gin.Context) {
	facilities, err := s.FacilityUsecase.GetList()

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.FacilityListRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    facilities,
		Meta: domain.Meta{
			Total:       0,
			PerPage:     10,
			CurrentPage: 1,
		},
	}

	c.JSON(http.StatusCreated, successRes)
}

// Create facility godoc
//
//	@Summary		Create facility
//	@Description	Create facility
//	@Tags			Facility
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.FacilityCreatePayload	true "facility"
//	@Success		201		{object}	domain.FacilitySuccessRes		"Created new facility"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/facility/create [post]
func (s FacilityController) CreateFacility(c *gin.Context) {
	var facilityCreatePayload domain.FacilityCreatePayload

	err := c.ShouldBind(&facilityCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	facility, err := s.FacilityUsecase.Create(facilityCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.FacilitySuccessRes{
		Status:  http.StatusCreated,
		Message: "success",
		Data:    facility,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Update facility godoc
//
//	@Summary		Update facility
//	@Description	Update facility
//	@Tags			Facility
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.FacilityUpdatePayload	true "facility"
//	@Success		201		{object}	domain.FacilitySuccessRes		"Updated facility"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/facility/update [put]
func (s FacilityController) UpdateFacility(c *gin.Context) {
	var facilityUpdatePayload domain.FacilityUpdatePayload

	err := c.ShouldBind(&facilityUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	updatedFacility, err := s.FacilityUsecase.Update(facilityUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.FacilitySuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    updatedFacility,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Get facility by id godoc
//
//	@Summary		Get facility by id
//	@Description	Get facility by id
//	@Tags			Facility
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			facility_id	path	int		true "facility_id"
//	@Success		201		{object}	domain.FacilitySuccessRes "facility"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/facility/{facility_id} [get]
func (s FacilityController) GetFacilityById(c *gin.Context) {
	facilityId, cnvErr := strconv.Atoi(c.Param("facility_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	facility, err := s.FacilityUsecase.GetById(facilityId)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.FacilitySuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    facility,
	}

	c.JSON(http.StatusBadRequest, successRes)
}

// Delete facility godoc
//
//	@Summary		Delete facility
//	@Description	Delete facility
//	@Tags			Facility
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			facility_id	path	int		true "facility_id"
//	@Success		201		{object}	domain.SuccessRes "facility"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/facility/{facility_id} [delete]
func (s FacilityController) DeleteFacility(c *gin.Context) {
	facilityId, cnvErr := strconv.Atoi(c.Param("facility_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	err := s.FacilityUsecase.Delete(facilityId)

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
