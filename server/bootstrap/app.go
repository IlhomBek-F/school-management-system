package bootstrap

import "gorm.io/gorm"

type Application struct {
	Env *Env
	Db  gorm.DB
}

func App() Application {
	app := Application{}

	app.Env = NewEnv()
	db, err := app.Env.NewDatabase()

	if err != nil {
		panic(err)
	}

	app.Db = *db

	return app
}
