package bootstrap

import (
	"log"

	"github.com/spf13/viper"
)

type Env struct {
	PORT                      int    `mapstructure:"PORT"`
	APP_ENV                   string `mapstructure:"APP_ENV"`
	DB_HOST                   string `mapstructure:"DB_HOST"`
	DB_PORT                   int    `mapstructure:"DB_PORT"`
	DB_DATABASE               string `mapstructure:"DB_DATABASE"`
	DB_USERNAME               string `mapstructure:"DB_USERNAME"`
	DB_PASSWORD               int    `mapstructure:"DB_PASSWORD"`
	DB_SCHEMA                 string `mapstructure:"DB_SCHEMA"`
	ACCESS_TOKEN_SECRET       string `mapstructure:"ACCESS_TOKEN_SECRET"`
	ACCESS_TOKEN_EXPIRY_HOUR  int    `mapstructure:"ACCESS_TOKEN_EXPIRY_HOUR"`
	REFRESH_TOKEN_EXPIRY_HOUR int    `mapstructure:"REFRESH_TOKEN_EXPIRY_HOUR"`
	REFRESH_TOKEN_SECRET      string `mapstructure:"REFRESH_TOKEN_SECRET"`
}

func NewEnv() *Env {
	env := &Env{}

	viper.AddConfigPath(".")    // look in the current directory
	viper.SetConfigName(".env") // name of the file without extension
	viper.SetConfigType("env")  // optional but helps clarify

	if err := viper.ReadInConfig(); err != nil {
		log.Fatal("Can't find env file: ", err)
	}

	if err := viper.Unmarshal(env); err != nil {
		log.Fatal("Environment can not be loaded...", err)
	}

	if env.APP_ENV == "development" {
		log.Println("The app is running in development env")
	}

	return env
}
