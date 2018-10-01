import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
public _currentWeather: any;
  constructor() { }

  @Input() set weatherData(value:any) {
    this._currentWeather = value;
    console.log("val",this._currentWeather);
  }
}
