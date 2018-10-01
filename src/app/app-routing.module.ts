import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {  } from './current-weather/current-weather.module'
export const routes: Routes = [
    {
        path:'',
        redirectTo: 'weather',
        pathMatch: 'full'
    },
    {
        path:'weather',
        loadChildren: './current-weather/current-weather.module#CurrentWeatherModule'
    },
    {
        path:'10day',
        loadChildren:'./forecast/forecast.module#ForecastModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}