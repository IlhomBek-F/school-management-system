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
	Email         string `json:"email"`
	Phone         string `json:"phone" binding:"required"`
	StreetAddress string `json:"street_address" binding:"required"`
	City          string `json:"city" binding:"required"`
}

type ProfessionalInformation struct {
	TeacherId      string `json:"teacher_id" binding:"required"`
	DepartmentId   int    `json:"department_id" binding:"required"`
	SubjectIds     []int  `json:"subject_ids" binding:"required"`
	Qualification  string `json:"qualification" binding:"required"`
	UniOrInsName   string `json:"uni_or_ins_name"`
	GraduationYear int    `json:"graduation_year"`
	Experience     int    `json:"experience"`
}

type EmploymentDetail struct {
	JoiningDate     string `json:"joing_date"`
	EmploymentType  string `json:"employment_type"`
	Salary          int    `json:"salary"`
	ContractEndDate string `json:"conrtact_end_date"`
}

type TeacherCreatePayload = Teacher
type TeacherUpdatePayload = Teacher
type TeacherSuccessRes = SuccessResponseWithData[Teacher]
type TeacherListRes = SuccessResponseWithMeta[[]Teacher]
