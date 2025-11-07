package controller

import (
	"net/http"
	"school/domain"
	"school/internal/usecase"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ClassController struct {
	ClassUsecase usecase.ClassUsecase
}

// Get class list godoc
//
//	@Summary		Get class list
//	@Description	Get class list
//	@Tags			Class
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Success		201		{object}	domain.ClassListRes "class"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/class/list [get]
func (s ClassController) GetClassList(c *gin.Context) {
	classes, err := s.ClassUsecase.GetList()

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.ClassListRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    classes,
		Meta: domain.Meta{
			Total:       0,
			PerPage:     10,
			CurrentPage: 1,
		},
	}

	c.JSON(http.StatusCreated, successRes)
}

// Create class godoc
//
//	@Summary		Create class
//	@Description	Create class
//	@Tags			Class
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.ClassCreatePayload	true "class"
//	@Success		201		{object}	domain.ClassSuccessRes		"Created new class"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/class/create [post]
func (s ClassController) CreateClass(c *gin.Context) {
	var classCreatePayload domain.ClassCreatePayload

	err := c.ShouldBind(&classCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	class, err := s.ClassUsecase.Create(classCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.ClassSuccessRes{
		Status:  http.StatusCreated,
		Message: "success",
		Data:    class,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Update class godoc
//
//	@Summary		Update class
//	@Description	Update class
//	@Tags			Class
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.ClassUpdatePayload	true "class"
//	@Success		201		{object}	domain.ClassSuccessRes		"Updated class"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/class/update [put]
func (s ClassController) UpdateClass(c *gin.Context) {
	var classUpdatePayload domain.ClassUpdatePayload

	err := c.ShouldBind(&classUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	updatedClass, err := s.ClassUsecase.Update(classUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.ClassSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    updatedClass,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Get class by id godoc
//
//	@Summary		Get class by id
//	@Description	Get class by id
//	@Tags			Class
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			class_id	path	int		true "class_id"
//	@Success		201		{object}	domain.ClassSuccessRes "class"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/class/{class_id} [get]
func (s ClassController) GetClassById(c *gin.Context) {
	classId, cnvErr := strconv.Atoi(c.Param("class_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	class, err := s.ClassUsecase.GetById(classId)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.ClassSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    class,
	}

	c.JSON(http.StatusBadRequest, successRes)
}

// Delete class godoc
//
//	@Summary		Delete class
//	@Description	Delete class
//	@Tags			Class
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			class_id	path	int		true "class_id"
//	@Success		201		{object}	domain.SuccessRes "class"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/class/{class_id} [delete]
func (s ClassController) DeleteClass(c *gin.Context) {
	classId, cnvErr := strconv.Atoi(c.Param("class_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	err := s.ClassUsecase.Delete(classId)

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
