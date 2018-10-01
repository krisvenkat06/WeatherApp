import { Component, OnInit } from '@angular/core';
import { DefaultUrlHandlingStrategy } from '@angular/router/src/url_handling_strategy';
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
  public cities: any = [
    {
      id:4190598,
      city: "Dallas"
    },{
      id:4671576,
      city:"Atlanta"
    },
    {
      id:4990729,
      city:"Detroit"
    },
    {
      id:5809844,
      city:"Seattle"
    }
  ];

  
  constructor(private _service : WeatherService,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.queryParams
      .subscribe(params => {
        if(params['city']){
          this.selectedCity = params;
          console.log("in ");
          this.getForecast(this.selectedCity.city.toLowerCase());
        } else {
          this.selectedCity = this.cities[0];
          console.log(this.selectedCity);
          this.getForecast(this.selectedCity.city.toLowerCase());
        }
      });

    
    
    
  }

  getForecast(city) {
    this._service.getForecastInfo(city)
    .subscribe((response:any) => {
      console.log("forecast1",response);
      this.forecastData = response;
    }),
    ((error) => {
      console.log("error");
    });
  }

  onSelectCity(){
    console.log("selectedCity",this.selectedCity);
    this.getForecast(this.selectedCity.city.toLowerCase());
  }

}
