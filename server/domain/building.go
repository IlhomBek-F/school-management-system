package domain

type Building struct {
	Base
	Name string `json:"name" binding:"required"`
}

type BuildingCreatePayload struct {
	Name string `json:"name" binding:"required"`
}
type BuildingUpdatePayload = Building
type BuildingSuccessRes = SuccessResponseWithData[Building]
type BuildingListRes = SuccessResponseWithMeta[[]Building]
