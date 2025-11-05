package middleware

import (
	"net/http"
	"school/bootstrap"
	"school/domain"
	"school/internal/service"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleWare(env *bootstrap.Env) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, domain.ErrorResponseMap[domain.ErrAuthorizationHeader])
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, domain.ErrorResponseMap[domain.ErrTokenMissing])
			c.Abort()
			return
		}

		_, err := service.ValidateToken(tokenString, env.ACCESS_TOKEN_SECRET)

		if err != nil {
			c.JSON(http.StatusUnauthorized, domain.ErrorResponseMap[domain.ErrTokenInvalid])
			c.Abort()
			return
		}

		claims, err := service.ParseToken(tokenString, env.ACCESS_TOKEN_SECRET)

		if err != nil {
			c.JSON(http.StatusUnauthorized, domain.ErrorResponseMap[domain.ErrTokenInvalid])
			c.Abort()
			return
		}

		c.Set("userId", claims.ID)
		c.Next()
	}
}
