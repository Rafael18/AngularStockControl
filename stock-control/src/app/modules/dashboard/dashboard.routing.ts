import { Routes } from "@angular/router";
import { DashboardHomeComponent } from "./page/dashboard-home/dashboard-home.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path:'',
    component: DashboardHomeComponent,
  }
];
