package controller

import (
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

type StudentController struct {
	StudentUsecase usecase.StudentUsecase
}

func (s StudentController) GetStudentById(c *gin.Context) {

}
