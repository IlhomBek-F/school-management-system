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
        loadChildren: () => import("../features/students/students.routes").then(r => r.STUDENT_ROUTES),
      },
      {
        path: "teachers",
        loadChildren: () => import("../features/teachers/teacher.routes").then(r => r.TEACHER_ROUTES),
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
