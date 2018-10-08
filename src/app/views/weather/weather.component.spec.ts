import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import {By} from "@angular/platform-browser";
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular//router/testing';
import { Router } from '@angular/router';

import { WeatherComponent } from './weather.component';
import { routes } from '../../app-routing.module';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let cityEl: DebugElement;
  let currentTemp: DebugElement;
  let maxTemp: DebugElement;
  let minTemp: DebugElement;
  let hum: DebugElement;
  let cardEl :DebugElement;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherComponent ],
      imports : [ RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    cardEl = fixture.debugElement.query(By.css('.card-feel'));
    cityEl = fixture.debugElement.query(By.css('span .city'));
    currentTemp = fixture.debugElement.query(By.css('.temp'));
    maxTemp = fixture.debugElement.query(By.css('.max'));
    minTemp = fixture.debugElement.query(By.css('.min'));
    hum = fixture.debugElement.query(By.css('.humd'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set Weather data',() => {
    let data:any = {
      "coord": {
          "lon": -84.84,
          "lat": 33.92
      },
      "sys": {
          "type": 1,
          "id": 749,
          "message": 0.0041,
          "country": "US",
          "sunrise": 1538220780,
          "sunset": 1538263510
      },
      "weather": [
          {
              "id": 800,
              "main": "Clear",
              "description": "clear sky",
              "icon": "01d"
          }
      ],
      "main": {
          "temp": 29.41,
          "pressure": 1022,
          "humidity": 54,
          "temp_min": 28,
          "temp_max": 31.1
      },
      "visibility": 11265,
      "wind": {
          "speed": 1.37,
          "deg": 343.5
      },
      "clouds": {
          "all": 1
      },
      "dt": 1538252841,
      "id": 4190598,
      "name": "Dallas"
  };
    component.weatherData = data;
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
        expect(component._currentWeather).toBeTruthy();
        cityEl = fixture.debugElement.query(By.css('.city-feel'));
        expect(cardEl.nativeElement.innerText).toContain(component._currentWeather.name); 
    });
  });

  it('Should not set Weather data',() => {
    let data:any;
    component.weatherData = data;
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
        fixture.detectChanges();
        expect(component._currentWeather).toBeUndefined();
    });
  });

  it('should navigate to Forecast Screen', ()=>{
    component.goToForecast('Dallas');
    fixture.whenStable().then(()=>{
       expect(router.navigate).toHaveBeenCalledWith(['/tenday/forecast?city=Dallas']);
    });
  });
});
