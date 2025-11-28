package controller

import (
	"net/http"
	"school/domain"
	"school/internal/usecase"
	"strconv"

	"github.com/gin-gonic/gin"
)

type TeacherController struct {
	TeacherUsecase usecase.TeacherUsecase
}

// Get teacher list godoc
//
//	@Summary		Get teacher list teacher
//	@Description	Get teacher list
//	@Tags			Teacher
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Success		201		{object}	domain.TeacherListRes "teacher"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/teacher/list [get]
func (t TeacherController) GetTeacherList(c *gin.Context) {
	var teacherQuery domain.TeacherQuery

	if err := c.ShouldBindQuery(&teacherQuery); err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	teachers, meta, err := t.TeacherUsecase.GetList(teacherQuery)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.TeacherListRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    teachers,
		Meta:    meta,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Create teacher godoc
//
//	@Summary		Create teacher
//	@Description	Create teacher
//	@Tags			Teacher
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.TeacherCreatePayload	true "teacher"
//	@Success		201		{object}	domain.TeacherSuccessRes		"Created new teacher"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/teacher/create [post]
func (t TeacherController) CreateTeacher(c *gin.Context) {
	var teacherCreatePayload domain.TeacherCreatePayload

	err := c.ShouldBind(&teacherCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	teacher, err := t.TeacherUsecase.Create(teacherCreatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.TeacherSuccessRes{
		Status:  http.StatusCreated,
		Message: "success",
		Data:    teacher,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Update teacher godoc
//
//	@Summary		Update teacher
//	@Description	Update teacher
//	@Tags			Teacher
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			payload	body		domain.TeacherUpdatePayload	true "teacher"
//	@Success		201		{object}	domain.TeacherSuccessRes		"Updated teacher"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/teacher/update [put]
func (t TeacherController) UpdateTeacher(c *gin.Context) {
	var teacherUpdatePayload domain.TeacherUpdatePayload

	err := c.ShouldBind(&teacherUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	updatedTeacher, err := t.TeacherUsecase.Update(teacherUpdatePayload)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.TeacherSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    updatedTeacher,
	}

	c.JSON(http.StatusCreated, successRes)
}

// Get teacher by id godoc
//
//	@Summary		Get teacher by id teacher
//	@Description	Get teacher by id
//	@Tags			Teacher
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			teacher_id	path	int		true "teacher_id"
//	@Success		201		{object}	domain.TeacherSuccessRes		"teacher"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/teacher/{teacher_id} [get]
func (t TeacherController) GetTeacherById(c *gin.Context) {
	teacherId, cnvErr := strconv.Atoi(c.Param("teacher_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	teacher, err := t.TeacherUsecase.GetById(teacherId)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.TeacherSuccessRes{
		Status:  http.StatusOK,
		Message: "success",
		Data:    teacher,
	}

	c.JSON(http.StatusBadRequest, successRes)
}

// Delete teacher godoc
//
//	@Summary		Delete teacher
//	@Description	Delete teacher
//	@Tags			Teacher
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Param			teacher_id	path	int		true "teacher_id"
//	@Success		201		{object}	domain.SuccessRes "teacher"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/teacher/{teacher_id} [delete]
func (t TeacherController) DeleteTeacher(c *gin.Context) {
	teacherId, cnvErr := strconv.Atoi(c.Param("teacher_id"))

	if cnvErr != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponseMap[domain.ErrBadRequest])
		return
	}

	err := t.TeacherUsecase.Delete(teacherId)

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
