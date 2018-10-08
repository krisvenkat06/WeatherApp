import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
public _currentWeather: any;
public math: any;
  constructor(private _router: Router) { 
    this.math = Math;
  }

  @Input() set weatherData(value:any) {
    if(value){
      this._currentWeather = value;
    }
  }

  goToForecast(cityName){
    this._router.navigate(['/10day/forecast'],{ queryParams: {city:cityName}});
  }
}
