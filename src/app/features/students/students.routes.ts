import { Routes } from "@angular/router";

export const STUDENT_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () => import("./students.component").then(c => c.StudentsComponent),
  },
  {
        path: ":id",
        loadComponent: () => import("./student-view-profile/student-view-profile.component").then(c => c.StudentViewProfileComponent),
  },
  {
    path: "",
    redirectTo: 'students',
    pathMatch: 'full'
  }
]
