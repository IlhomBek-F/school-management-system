package main

import (
	"school/bootstrap"
	_ "school/docs"
	"school/internal/route"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Swagger
//
//	@title                       School Management System API
//	@version                     1.0
//	@description                 A comprehensive API for school management system.
//	@license.url                 http://www.apache.org/licenses/LICENSE-2.0.html
//	@host                        localhost:8080
//	@BasePath                    /api/v1/
//	@schemes                     http https
//	@securityDefinitions.apiKey  JWT
//	@in                          header
//	@name                        Authorization
//	@description                 JWT security accessToken. Please add it in the format "Bearer {AccessToken}" to authorize your requests.
func main() {
	app := bootstrap.App()

	env := app.Env

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
		AllowAllOrigins:  true,
		MaxAge:           30,
	}))
	route.SetupRoutes(app, router)

	router.Run(env.SERVER_ADDRESS)
}
