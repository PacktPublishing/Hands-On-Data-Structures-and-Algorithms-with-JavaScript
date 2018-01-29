import { Routes } from '@angular/router';
import {AboutComponents, AboutRoutes} from "./pages/about/about.routing";
import {DashboardComponents, DashboardRoutes} from "./pages/dashboard/dashboard.routing";
import {HomeComponents, HomeRoutes} from "./pages/home/home.routing";
import {ProfileComponents, ProfileRoutes} from "./pages/profile/profile.routing";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    ...AboutRoutes,
    ...DashboardRoutes,
    ...HomeRoutes,
    ...ProfileRoutes
];

export const navigatableComponents = [
    ...AboutComponents,
    ...DashboardComponents,
    ...HomeComponents,
    ...ProfileComponents
];