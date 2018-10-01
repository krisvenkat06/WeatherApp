import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../services/weather.service';
import { ICurrentWeatherResponse } from '../models/current-weather.model';
@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  public currentWeather: ICurrentWeatherResponse;
  public cWeather : any;
  constructor(private _wService: WeatherService) { }

  ngOnInit() {
    this._wService.getCurrentWeatherInfo().subscribe((response:ICurrentWeatherResponse)=>{
     if(response != undefined){
       this.currentWeather = response;
       this.cWeather = this.currentWeather.list[0];
      console.log("current",response);
     } 
    }),
    (error) => {
      console.log("error");
    };
    
  }
}
