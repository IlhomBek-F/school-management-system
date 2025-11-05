package route

import (
	"school/bootstrap"

	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func SetupRoutes(app bootstrap.Application, gin *gin.Engine) {
	publicRouter := gin.Group("api/v1")
	gin.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	NewLoginRoute(app, publicRouter)
}
