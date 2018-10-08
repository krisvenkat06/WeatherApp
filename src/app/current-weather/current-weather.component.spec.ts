import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { CurrentWeatherComponent } from './current-weather.component';
import { WeatherComponent } from '../views/weather/weather.component';
import { WeatherService } from '../services/weather.service';
import { MockBackend } from '@angular/http/testing';
import { MockWeatherService } from '../services/Mock-data/MockWeatherService';
import { routes } from '../app-routing.module';
import { DebugElement } from '@angular/core';
import { element } from 'protractor';


let currentWeather:any = {"cnt":4,"list":[{"coord":{"lon":-84.84,"lat":33.92},"sys":{"type":1,"id":749,"message":0.0047,"country":"US","sunrise":1538480110,"sunset":1538522465},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"main":{"temp":29.06,"pressure":1023,"humidity":48,"temp_min":28,"temp_max":30.6},"visibility":11265,"wind":{"speed":1.52,"deg":7.00235},"clouds":{"all":40},"dt":1538511896,"id":4190598,"name":"Dallas"},{"coord":{"lon":-94.16,"lat":33.11},"sys":{"type":1,"id":287,"message":0.004,"country":"US","sunrise":1538482331,"sunset":1538524717},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"main":{"temp":29.22,"pressure":1019,"humidity":58,"temp_min":28.9,"temp_max":29.5},"visibility":16093,"wind":{"speed":2.6,"deg":140},"clouds":{"all":75},"dt":1538511896,"id":4671576,"name":"Atlanta"},{"coord":{"lon":-83.05,"lat":42.33},"sys":{"type":1,"id":1401,"message":0.0041,"country":"US","sunrise":1538479879,"sunset":1538521826},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"main":{"temp":20.66,"pressure":1016,"humidity":68,"temp_min":18.9,"temp_max":22.2},"visibility":16093,"wind":{"speed":2.6,"deg":300},"clouds":{"all":90},"dt":1538511896,"id":4990729,"name":"Detroit"},{"coord":{"lon":-122.33,"lat":47.61},"sys":{"type":1,"id":2949,"message":0.005,"country":"US","sunrise":1538489467,"sunset":1538531081},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"main":{"temp":14.22,"pressure":1007,"humidity":57,"temp_min":11.1,"temp_max":16.1},"visibility":16093,"wind":{"speed":5.7,"deg":190,"gust":10.8},"clouds":{"all":40},"dt":1538511896,"id":5809844,"name":"Seattle"}]};


describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let service: WeatherService;
  let spy: any;
  let viewMoreEl: DebugElement;

  const tbConfig = {
    declarations: [ CurrentWeatherComponent, WeatherComponent ],
    imports: [ HttpClientModule, RouterTestingModule.withRoutes(routes)],
    providers: [ {provide: WeatherService, useClass: MockWeatherService }]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule(tbConfig).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    service = TestBed.get(WeatherService);
    viewMoreEl = fixture.debugElement.query(By.css('.container'));
   // console.log("app-weather",viewMoreEl.nativeElement);
    fixture.detectChanges();
  });

  afterEach(()=>{
    service = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getCurrentWeatherInfo should return current weather',async() =>{
    spyOn(component,'getWeather').and.returnValue(currentWeather);    
    spyOn(component,'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalledTimes(1);
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();
      expect(component.getWeather).toHaveBeenCalledTimes(1);
      expect(component.currentWeather.cnt).toBe(4);
      //expect(element('app-weather').count()).toEqual(4);
    });

    it('should navigate to Forecast screen',()=>{
      
    });
  });
  
});
