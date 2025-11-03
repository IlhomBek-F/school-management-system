package main

import (
	"fmt"
	"school/bootstrap"

	"github.com/gin-gonic/gin"
)

func main() {
	app := bootstrap.App()

	env := app.Env

	router := gin.Default()
	router.Run(fmt.Sprintf("%s", env.PORT))
}
