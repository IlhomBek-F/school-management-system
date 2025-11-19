package domain

type StudentFields struct {
	PersonalInfo PersonalInfo `json:"personal_info" gorm:"embedded" binding:"required"`
	AcademicInfo AcademicInfo `json:"academic_info" gorm:"embedded" binding:"required"`
}

type Student struct {
	Base
	PersonalInfo PersonalInfo `json:"personal_info" gorm:"embedded" binding:"required"`
	AcademicInfo AcademicInfo `json:"academic_info" gorm:"embedded" binding:"required"`
}

type PersonalInfo struct {
	FirstName     string `json:"first_name" binding:"required"`
	LastName      string `json:"last_name" binding:"required"`
	Email         string `json:"email"`
	DateOfBirth   string `json:"date_of_birth" binding:"required"`
	PhoneNumber   string `json:"phone_number" binding:"required"`
	Gender        string `json:"gender" binding:"required"`
	BloodGroupId  string `json:"blood_group_id" binding:"required"`
	StreetAddress string `json:"street_address" binding:"required"`
	City          string `json:"city" binding:"required"`
}

type AcademicInfo struct {
	StudentId        string `json:"student_id"`
	GradeId          int    `json:"grade_id" binding:"required"`
	ClassSectionId   int    `json:"class_section_id" binding:"required"`
	AdmissionDate    string `json:"admission_date" binding:"required"`
	PrevSchool       string `json:"prev_school"`
	EmergencyContact string `json:"emergency_contact" binding:"required"`
}

type StudentQuery struct {
	Paginator
	GradeId   int    `form:"grade_id"`
	QueryTerm string `form:"search"`
}

type StudentCreatePayload = StudentFields
type StudentUpdatePayload = Student
type StudentSuccessRes = SuccessResponseWithData[Student]
type StudentListRes = SuccessResponseWithMeta[[]Student]
