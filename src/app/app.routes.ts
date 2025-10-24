import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./layout/layout.routes").then(c => c.LAYOUT_ROUTES),
  },
  {
    path: "",
    redirectTo: "",
    pathMatch: "full"
  },
  {
    path: "login",
    loadComponent: () => import("./features/login/login.component").then(c => c.LoginCompoent)
  }
];
