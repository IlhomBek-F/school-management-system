package domain

type Building struct {
	Base
	Name string `json:"name" binding:"required"`
}

type BuildingCreatePayload = Building
type BuildingUpdatePayload = Building
type BuildingCreateRes = SuccessResponseWithData[Building]
type BUildingListRes = SuccessResponseWithMeta[[]Building]
