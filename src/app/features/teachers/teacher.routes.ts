import { Routes } from "@angular/router";

export const TEACHER_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () => import("./teachers.component").then(c => c.TeachersComponent),
  },
  {
        path: ":teacher_id",
        loadComponent: () => import("./teacher-view-detail/teacher-view-detail.component").then(c => c.TeacherViewDetailComponent),
  },
  {
        path: ":teacher_id/:class_id",
        loadComponent: () => import("./class-view-detail/class-view-detail.component").then(c => c.ClassViewDetailComponent),
        pathMatch: 'full'
  },
  {
    path: "",
    redirectTo: 'teachers',
    pathMatch: 'full'
  }
]
