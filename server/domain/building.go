package domain

type Building struct {
	Base
	Name string `json:"name" binding:"required"`
}

type BuildingCreatePayload = Building
type BuildingUpdatePayload = Building
type BuildingSuccessRes = SuccessResponseWithData[Building]
type BuildingListRes = SuccessResponseWithMeta[[]Building]
