package domain

type Teacher struct {
	Base
	PersonalInfo     PersonalInformation     `json:"personal_info" gorm:"embedded" binding:"required"`
	ProfessionalInfo ProfessionalInformation `json:"professional_info" gorm:"embedded" binding:"required"`
	EmploymentDetail EmploymentDetail        `json:"employment_detail" gorm:"embedded" binding:"required"`
}

type PersonalInformation struct {
	FirstName     string `json:"first_name" binding:"required"`
	LastName      string `json:"last_name" binding:"required"`
	DateOfBirth   string `json:"date_of_birth" binding:"required"`
	Gender        string `json:"gender" binding:"required"`
	Email         string `json:"email" binding:"required"`
	PhoneNumber   string `json:"phone_number" binding:"required"`
	StreetAddress string `json:"street_address" binding:"required"`
	City          string `json:"city" binding:"required"`
}

type ProfessionalInformation struct {
	TeacherId      string    `json:"teacher_id" binding:"required"`
	DepartmentId   int       `json:"department_id" binding:"required"`
	Subjects       []Subject `json:"subjects" binding:"required" gorm:"many2many:teacher_subjects"`
	Qualification  string    `json:"qualification" binding:"required"`
	UniOrInsName   string    `json:"uni_or_ins_name"`
	GraduationYear int       `json:"graduation_year"`
	Experience     int       `json:"experience"`
}

type TeacherSubject struct {
	Id        int `json:"id"`
	TeacherId int `json:"teacher_id"`
	SubjectId int `json:"subject_id"`
}

type EmploymentDetail struct {
	JoiningDate      string `json:"joining_date"`
	EmploymentTypeId int    `json:"employment_type_id"`
	Salary           int    `json:"salary"`
	ContractEndDate  string `json:"contract_end_date"`
}

type TeacherFields struct {
	PersonalInfo     PersonalInformation     `json:"personal_info" gorm:"embedded" binding:"required"`
	ProfessionalInfo ProfessionalInformation `json:"professional_info" gorm:"embedded" binding:"required"`
	EmploymentDetail EmploymentDetail        `json:"employment_details" gorm:"embedded" binding:"required"`
}

type TeacherQuery struct {
	Paginator
	DepartmentId int    `form:"department_id"`
	QueryTerm    string `form:"search"`
}

type TeacherCreatePayload = TeacherFields
type TeacherUpdatePayload = Teacher
type TeacherSuccessRes = SuccessResponseWithData[Teacher]
type TeacherListRes = SuccessResponseWithMeta[[]Teacher]
