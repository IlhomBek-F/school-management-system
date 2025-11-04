package route

import (
	"school/bootstrap"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(app bootstrap.Application, gin *gin.Engine) {
	publicRouter := gin.Group("api/v1")
	NewLoginRoute(app, publicRouter)
}
