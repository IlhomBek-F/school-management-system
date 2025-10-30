import { Routes } from "@angular/router";

export const LAYOUT_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () => import("./layout.component").then(c => c.LayoutComponent),
    children: [
      {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: 'full'
      },
      {
        path: "dashboard",
        loadComponent: () => import("../features/dashboard/pages/dashboard.component").then(c => c.DashboardComponent),
      },
      {
        path: "students",
        loadComponent: () => import("@students/students.component").then(c => c.StudentsComponent),
      },
      {
        path: "students/:id",
        loadComponent: () => import("@students/student-view-profile/student-view-profile.component").then(c => c.StudentViewProfileComponent),
      },
      {
        path: "teachers",
        loadComponent: () => import("@teachers/teachers.component").then(c => c.TeachersComponent),
      },
      {
        path: "teachers/:teacher_id",
        loadComponent: () => import("@teachers/teacher-view-detail/teacher-view-detail.component").then(c => c.TeacherViewDetailComponent),
      },
      {
        path: "teachers/:teacher_id/:class_id",
        loadComponent: () => import("@classes/class-view-detail/class-view-detail.component").then(c => c.ClassViewDetailComponent),
      },
      {
        path: "classes",
        loadComponent: () => import("@classes/classes.component").then(c => c.ClassesComponent),
      },
      {
        path: "classes/:teacher_id/:class_id",
        loadComponent: () => import("@classes/class-view-detail/class-view-detail.component").then(c => c.ClassViewDetailComponent),
      },
      {
        path: 'rooms',
        loadComponent: () => import('@rooms/rooms.component').then(c => c.RoomsComponent)
      },
      {
        path: "settings",
        loadComponent: () => import("@settings/settings.component").then(c => c.SettingsComponent),
      },
    ]
  },
]
