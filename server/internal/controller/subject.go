package controller

import (
	"net/http"
	"school/domain"
	"school/internal/usecase"
	"strconv"

	"github.com/gin-gonic/gin"
)

type SubjectController struct {
	SubjectUsecase usecase.SubjectUsecase
}

// Get subject list godoc
//
//	@Summary		Get subject list
//	@Description	Get subject list
//	@Tags			Subject
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Success		201		{object}	domain.SubjectListRes "subject"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/subject/list [get]
func (s SubjectController) GetSubjectList(c *gin.Context) {
	subjects, err := s.SubjectUsecase.GetList()

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.SubjectListRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    subjects,
		Meta: domain.Meta{
			Total:       0,
			PerPage:     10,
			CurrentPage: 1,
		},
	}

	c.JSON(http.StatusCreated, successRes)
}

// Create subject godoc
//
//	@Summary		Create subject
//	@Description	Create subject
//	@Tags			Subject
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.CreateSubjectPayload	true "subject"
//	@Success		201		{object}	domain.SubjectSuccessRes		"Created new subject"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/subject/create [post]
func (s SubjectController) CreateSubject(c *gin.Context) {
	var subjectCreatePayload domain.CreateSubjectPayload

	err := c.ShouldBind(&subjectCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	subject, err := s.SubjectUsecase.Create(subjectCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.SubjectSuccessRes{
		Status:  http.StatusCreated,
		Message: "success",
		Data:    subject,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Update subject godoc
//
//	@Summary		Update subject
//	@Description	Update subject
//	@Tags			Subject
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.UpdateSubjectPayload	true "subject"
//	@Success		201		{object}	domain.SubjectSuccessRes		"Updated subject"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/subject/update [put]
func (s SubjectController) UpdateSubject(c *gin.Context) {
	var subjectUpdatePayload domain.UpdateSubjectPayload

	err := c.ShouldBind(&subjectUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	updatedSubject, err := s.SubjectUsecase.Update(subjectUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.SubjectSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    updatedSubject,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Get subject by id godoc
//
//	@Summary		Get subject by id
//	@Description	Get subject by id
//	@Tags			Subject
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			subject_id	path	int		true "subject_id"
//	@Success		201		{object}	domain.SubjectSuccessRes		"subject"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/subject/{subject_id} [get]
func (s SubjectController) GetSubjectById(c *gin.Context) {
	subjectId, cnvErr := strconv.Atoi(c.Param("subject_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	subject, err := s.SubjectUsecase.GetById(subjectId)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.SubjectSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    subject,
	}

	c.JSON(http.StatusBadRequest, successRes)
}

// Delete subject godoc
//
//	@Summary		Delete subject
//	@Description	Delete subject
//	@Tags			Subject
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			subject_id	path	int		true "subject_id"
//	@Success		201		{object}	domain.SuccessRes "subject"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/subject/{subject_id} [delete]
func (s SubjectController) DeleteSubject(c *gin.Context) {
	subjectId, cnvErr := strconv.Atoi(c.Param("subject_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	err := s.SubjectUsecase.Delete(subjectId)

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
