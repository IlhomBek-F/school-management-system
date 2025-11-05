package controller

import (
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

type TeacherController struct {
	TeacherUsecase usecase.TeacherUsecase
}

func (t TeacherController) GetTeacherById(c *gin.Context) {

}
