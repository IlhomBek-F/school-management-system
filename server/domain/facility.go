package domain

type Facility struct {
	Base
	Name string `json:"name" binding:"required"`
}

type FacilityCreatePayload = Facility
type FacilityUpdatePayload = Facility
type FacilityCreateRes = SuccessResponseWithData[Facility]
type FacilityListRes = SuccessResponseWithData[[]Facility]
