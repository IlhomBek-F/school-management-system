# School Management System

A comprehensive fullstack school management system built with Angular and Go (Gin framework) for managing students, teachers, classes, and academic operations.

## 🚀 Features

- **Student Management**: Register, update, and track student information
- **Teacher Management**: Manage teacher profiles and assignments
- **Class Management**: Create and organize classes and schedules
- **Attendance Tracking**: Record and monitor student attendance
- **Grade Management**: Input and manage student grades and assessments
- **User Authentication**: Secure login system with role-based access control
- **Dashboard**: Interactive dashboard with analytics and insights
- **Reports**: Generate academic and administrative reports

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 17+
- **UI Components**: PrimeNg / TailwindCss
- **State Management**: RxJS
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router

### Backend
- **Language**: Go 1.21+
- **Framework**: Gin
- **Database**: PostgreSQL
- **ORM**: GORM
- **Authentication**: JWT
- **API Documentation**: Swagger

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18+ recommended)
- npm or yarn
- Go (v1.21 or higher)
- PostgreSQL
- Git

## 🔧 Installation

### Clone the Repository
```bash
git clone https://github.com/yourusername/school-management-system.git
cd school-management-system
```

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install Go dependencies:
```bash
go mod download
```

3. Create a `.env` file in the server directory:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=school_db
JWT_SECRET=your_secret_key
PORT=8080
```

4. Run database migrations:
```bash
go run main.go migrate
```

5. Start the server:
```bash
go run main.go
```

The server will start at `http://localhost:8080`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `environment.ts` file in `src/environments/`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

4. Start the development server:
```bash
ng serve
```

The application will be available at `http://localhost:4200`

## 📁 Project Structure

```
school-management-system/
├── client/                  # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── models/
│   │   ├── assets/
│   │   └── environments/
│   └── package.json
│
├── server/                  # Go backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── database/
│   ├── utils/
│   ├── main.go
│   └── go.mod
│
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh token

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher by ID
- `POST /api/teachers` - Create new teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get class by ID
- `POST /api/classes` - Create new class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

### Grades
- `GET /api/grades/student/:id` - Get grades for a student
- `POST /api/grades` - Add new grade
- `PUT /api/grades/:id` - Update grade

## 🚢 Deployment

### Backend Deployment
```bash
cd server
go build -o school-management-api
./school-management-api
```

### Frontend Deployment
```bash
cd client
ng build --configuration production
```

Deploy the `dist/` folder to your hosting service (Netlify, Vercel, etc.)

## 👥 User Roles

- **Admin**: Full system access
- **Teacher**: Manage classes, grades, and attendance
- **Student**: View grades, schedule, and attendance
- **Parent**: View child's academic information

## 🙏 Acknowledgments

- Angular Team
- Gin Framework
- GORM