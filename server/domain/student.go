package domain

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
	Phone         string `json:"phone" binding:"required"`
	Gender        string `json:"ggnder" binding:"required"`
	BloodGroup    string `json:"blood_group" binding:"required"`
	StreetAddress string `json:"street_address" binding:"required"`
	City          string `json:"city" binding:"required"`
}

type AcademicInfo struct {
	StudentId        string `json:"student_id"`
	Grade            string `json:"grade" binding:"required"`
	ClassSection     string `json:"class_section" binding:"required"`
	AdmissionDate    string `json:"admission_date" binding:"required"`
	PrevSchool       string `json:"prev_school"`
	EmergencyContact string `json:"emergency_contact" binding:"required"`
}

type StudentCreatePayload = Student
type StudentUpdatePayload = Student
type StudentSuccessRes = SuccessResponseWithData[Student]
type StudentListRes = SuccessResponseWithMeta[[]Student]
