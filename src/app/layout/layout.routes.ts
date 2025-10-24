import { Routes } from "@angular/router";

export const LAYOUT_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () => import("./layout.component").then(c => c.LayoutComponent),
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("../features/dashboard/dashboard.component").then(c => c.DashboardComponent),
      },
      {
        path: "students",
        loadComponent: () => import("../features/students/students.component").then(c => c.StudentsComponent),
      },
      {
        path: "teachers",
        loadComponent: () => import("../features/teachers/teachers.component").then(c => c.TeachersComponent),
      },
      {
        path: "classes",
        loadComponent: () => import("../features/classes/classes.component").then(c => c.ClassesComponent),
      },
      {
        path: "settings",
        loadComponent: () => import("../features/settings/settings.component").then(c => c.SettingsComponent),
      },
      {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: 'full'
      }
    ]
  },
]
