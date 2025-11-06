package domain

type Subject struct {
	Base
	Name        string `json:"name"`
	Description string `json:"description"`
}

type UpdateSubjectPayload = Subject
type CreateSubjectPayload = Subject
type SubjectCreateRes = SuccessResponseWithData[Subject]
type SubjectListRes = SuccessResponseWithMeta[[]Subject]
