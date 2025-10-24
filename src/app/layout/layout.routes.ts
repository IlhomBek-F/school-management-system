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
        path: "",
        redirectTo: "/dashboard",
        pathMatch: 'full'
      }
    ]
  },
]
