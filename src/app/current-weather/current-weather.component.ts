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
  private sub;
  public errResponse:any;
  constructor(private _wService: WeatherService) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather(){
    this.sub = this._wService.getCurrentWeatherInfo().subscribe((response:ICurrentWeatherResponse)=>{
      if(response != undefined){
        this.currentWeather = response;
      } 
     },
     (error) => {
       this.errResponse = error;
     });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
