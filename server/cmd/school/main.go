package main

import (
	"school/bootstrap"
	"school/internal/route"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	app := bootstrap.App()

	env := app.Env

	router := gin.Default()

	router.Use(cors.Default())
	route.SetupRoutes(app, router)

	router.Run(env.SERVER_ADDRESS)
}
