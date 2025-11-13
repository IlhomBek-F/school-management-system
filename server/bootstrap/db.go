package bootstrap

import (
	"context"
	"fmt"
	"school/domain"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func (env Env) NewDatabase() (*gorm.DB, error) {
	addr := env.GetDbAddr()
	db, err := gorm.Open(postgres.Open(addr), &gorm.Config{})

	if err != nil {
		return nil, err
	}

	sqlDb, _ := db.DB()

	sqlDb.SetMaxOpenConns(25)
	sqlDb.SetMaxIdleConns(25)

	duration, err := time.ParseDuration("5m")

	if err != nil {
		return nil, err
	}

	sqlDb.SetConnMaxIdleTime(duration)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err = sqlDb.PingContext(ctx); err != nil {
		return nil, err
	}

	return db, nil
}

func WithTransaction(ctx context.Context, db *gorm.DB, fn func(tx *gorm.DB) error) error {
	return db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		return fn(tx)
	})
}

func QueryScope(query *domain.Paginator) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {

		if query.Page <= 0 {
			query.Page = 1
		}

		switch {
		case query.PerPage > 100:
			query.PerPage = 100
		case query.PerPage <= 0:
			query.PerPage = 10
		}

		offset := (query.Page - 1) * query.PerPage
		return db.Offset(offset).Limit(query.PerPage)
	}
}

func (env Env) GetDbAddr() string {
	host := env.DB_HOST
	DbPort := env.DB_PORT
	database := env.DB_DATABASE
	password := env.DB_PASSWORD
	username := env.DB_USERNAME
	schema := env.DB_SCHEMA

	address := fmt.Sprintf("host=%s user=%s password=%d dbname=%s port=%s sslmode=disable search_path=%s",
		host, username, password, database, DbPort, schema)
	fmt.Println(address)
	return address
}
