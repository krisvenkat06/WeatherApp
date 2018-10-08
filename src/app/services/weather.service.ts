import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    let forecastUrl = weatherForecastUrl.replace('${data}',data);
    return this._http.get(forecastUrl);
  }

}
