package controller

import (
	"net/http"
	"school/domain"
	"school/internal/usecase"

	"github.com/gin-gonic/gin"
)

type StatsController struct {
	StatsUsecase usecase.StatsUsecase
}

// Get quick stats godoc
//
//	@Summary		Get quick stats
//	@Description	Get quick stats
//	@Tags			Stats
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Success		201		{object}	domain.QuickStatsResSuccess "quick stats"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/stats/quick [get]
func (s StatsController) GetQuickStats(c *gin.Context) {
	quickStats, err := s.StatsUsecase.GetQuickStats()

	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.QuickStatsResSuccess{
		Status:  http.StatusOK,
		Message: "success",
		Data:    quickStats,
	}

	c.JSON(http.StatusOK, successRes)
}

// Get room stats godoc
//
//	@Summary		Get room stats
//	@Description	Get room stats
//	@Tags			Stats
//	@Accept			json
//	@Security       JWT
//	@Produce		json
//	@Success		201		{object}	domain.RoomStatsResSuccess "room stats"
//	@Failure		400		{object}	error
//	@Failure		500		{object}	error
//	@Router			/stats/room [get]
func (s StatsController) GetRoomStats(c *gin.Context) {
	quickStats, err := s.StatsUsecase.GetRoomStats()

	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.ErrorResponseMap[domain.ErrInternalServer])
		return
	}

	successRes := domain.RoomStatsResSuccess{
		Status:  http.StatusOK,
		Message: "success",
		Data:    quickStats,
	}

	c.JSON(http.StatusOK, successRes)
}
