import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentWeatherComponent } from './current-weather.component';
import { CurrentWeatherRoutingModule } from './current-weather-routing.module';
import { WeatherComponent } from '../views/weather/weather.component';

@NgModule({
  imports: [
    CommonModule,
    CurrentWeatherRoutingModule
  ],
  declarations: [CurrentWeatherComponent, WeatherComponent],
  exports: [WeatherComponent],
})
export class CurrentWeatherModule { }
