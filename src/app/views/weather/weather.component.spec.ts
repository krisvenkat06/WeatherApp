import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';
import { DebugElement } from '@angular/core';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let nameEl: DebugElement;
  let tempEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setting Weather data to the input properties',() => {
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
    expect(component._currentWeather).toBeTruthy();
  });
});
