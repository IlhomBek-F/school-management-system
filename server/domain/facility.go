package domain

type Facicility struct {
	Base
	Name string `json:"name" binding:"required"`
}

type FacilityCreatePayload = Facicility
type FacilityUpdatePayload = Facicility
type FacilityCreateRes = SuccessResponseWithData[Facicility]
type FacilityListRes = SuccessResponseWithData[[]Facicility]
