import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';

import { WeatherService } from '../services/weather.service';
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  public selectedCity;
  public forecastData:any;
  public math:any;
  public negResponse:boolean = false;
  public cities: any =  {
      id:4190598,
      city: "Dallas"
    };

  
  constructor(private _service : WeatherService,
              private _activatedRoute: ActivatedRoute) { 
                this.math = Math;
              }

  ngOnInit() {
    this._activatedRoute.queryParams
      .subscribe(params => {
        if(params['city']){
          this.selectedCity = params;
          this.getForecast(this.selectedCity.city.toLowerCase());
        } else {
          this.selectedCity = this.cities;
          this.getForecast(this.selectedCity.city.toLowerCase());
        }
      });
  }

  getForecast(city) {
    this._service.getForecastInfo(city)
    .subscribe((response:any) => {
      this.forecastData = response;
    },
    (err) => {
      this.negResponse = true;
    });
  }

  ngAfterViewInit() {
    
  }

}
