package controller

import (
	"net/http"
	"school/domain"
	"school/internal/usecase"
	"strconv"

	"github.com/gin-gonic/gin"
)

type StudentController struct {
	StudentUsecase usecase.StudentUsecase
}

// Get student list godoc
//
//	@Summary		Get student list student
//	@Description	Get student list
//	@Tags			Student
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Success		201		{object}	domain.StudentListRes "student"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/student/list [get]
func (s StudentController) GetStudentList(c *gin.Context) {
	var queryStudent domain.StudentQuery

	err := c.ShouldBindQuery(&queryStudent)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	students, meta, err := s.StudentUsecase.GetList(queryStudent)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.StudentListRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    students,
		Meta:    meta,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Create student godoc
//
//	@Summary		Create student
//	@Description	Create student
//	@Tags			Student
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.StudentCreatePayload	true "student"
//	@Success		201		{object}	domain.StudentSuccessRes		"Created new student"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/student/create [post]
func (s StudentController) CreateStudent(c *gin.Context) {
	var studentCreatePayload domain.StudentCreatePayload

	err := c.ShouldBind(&studentCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	student, err := s.StudentUsecase.Create(studentCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.StudentSuccessRes{
		Status:  http.StatusCreated,
		Message: "success",
		Data:    student,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Update student godoc
//
//	@Summary		Update student
//	@Description	Update student
//	@Tags			Student
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.StudentUpdatePayload	true "student"
//	@Success		201		{object}	domain.StudentSuccessRes		"Updated student"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/student/update [put]
func (s StudentController) UpdateStudent(c *gin.Context) {
	var studentUpdatePayload domain.StudentUpdatePayload

	err := c.ShouldBind(&studentUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	updatedStudent, err := s.StudentUsecase.Update(studentUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.StudentSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    updatedStudent,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Get student by id godoc
//
//	@Summary		Get student by id student
//	@Description	Get student by id
//	@Tags			Student
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			student_id	path	int		true "student_id"
//	@Success		201		{object}	domain.StudentSuccessRes		"student"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/student/{student_id} [get]
func (s StudentController) GetStudentById(c *gin.Context) {
	studentId, cnvErr := strconv.Atoi(c.Param("student_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	student, err := s.StudentUsecase.GetById(studentId)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.StudentSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    student,
	}

	c.JSON(http.StatusOK, successRes)
}

// Delete student godoc
//
//	@Summary		Delete student
//	@Description	Delete student
//	@Tags			Student
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			student_id	path	int		true "student_id"
//	@Success		201		{object}	domain.SuccessRes "student"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/student/{student_id} [delete]
func (s StudentController) DeleteStudent(c *gin.Context) {
	studentId, cnvErr := strconv.Atoi(c.Param("student_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	err := s.StudentUsecase.Delete(studentId)

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
