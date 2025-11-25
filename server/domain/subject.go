package domain

type Subject struct {
	Base
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
}

type SubjectCreatePayload struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
}

type UpdateSubjectPayload = Subject
type CreateSubjectPayload = SubjectCreatePayload
type SubjectSuccessRes = SuccessResponseWithData[Subject]
type SubjectListRes = SuccessResponseWithMeta[[]Subject]
