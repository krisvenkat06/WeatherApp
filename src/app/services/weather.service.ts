import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map }  from 'rxjs/operators';
import 'rxjs/operator/catch';

import { API_KEY, currentWeatherUrl, weatherForecastUrl } from '../utils/weatherapp-constants';
import { ICurrentWeatherResponse } from '../models/current-weather.model';
@Injectable()
export class WeatherService {

  constructor(private _http: HttpClient) { 
    
  }

  getCurrentWeatherInfo(): Observable<any>{
    return this._http.get(currentWeatherUrl+API_KEY);
  }

  getForecastInfo(data): Observable<any>{
    let forecastUrl=("https://api.openweathermap.org/data/2.5/forecast/daily?q=${data}&APPID=001b0f58045147663b1ea518d34d88b4&units=metric&cnt=10").replace('${data}',data);
    console.log(forecastUrl);
    return this._http.get(forecastUrl);
  }

}
