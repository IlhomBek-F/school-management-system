package domain

type Facility struct {
	Base
	Name string `json:"name" binding:"required"`
}

type FacilityCreatePayload struct {
	Name string `json:"name" binding:"required"`
}

type FacilityUpdatePayload = Facility
type FacilitySuccessRes = SuccessResponseWithData[Facility]
type FacilityListRes = SuccessResponseWithMeta[[]Facility]
