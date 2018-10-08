import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';


import { ForecastComponent } from './forecast.component';
import { WeatherService } from '../services/weather.service';
import { MockWeatherService } from '../services/Mock-data/MockWeatherService';

class MockErrWeatherService extends WeatherService{
  constructor(){
    super(null);
  }

  getForecastInfo(): Observable<any> {
    return Observable.throw({"cod":"404","message":"city not found"});
  }
}

class MockActivatedRoute extends ActivatedRoute {
  constructor(){
    super();
    this.queryParams = Observable.of(
    {
      params :
      {city:'Dallas'}
    });
  }
}

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  let router: Router;
  let service: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      providers: [ { provide: WeatherService, useClass : MockWeatherService },
       { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    service = TestBed.get(WeatherService);
    fixture.detectChanges();
  });

  afterEach(()=>{
    component = null;
    service = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should get the values from Route',()=>{
     
     let spy = spyOn(component, 'ngOnInit').and.callThrough();
     component.ngOnInit();
     expect(spy).toHaveBeenCalled();
     fixture.detectChanges();
     let city = component.selectedCity.city.toLowerCase();
     expect(city).toEqual('dallas');
     let foreCastSpy = spyOn(service,'getForecastInfo').and.callThrough();
     service.getForecastInfo(city);
     expect(foreCastSpy).toHaveBeenCalledWith(city);
     expect(component.forecastData.city.name).toEqual('Dallas');
   });

   it('Weather Forecast should return error value',() => {
    let mockSpy: WeatherService =  new MockErrWeatherService(); 
     TestBed.overrideProvider(WeatherService, { useValue : mockSpy });
      service = TestBed.get(WeatherService);
      fixture = TestBed.createComponent(ForecastComponent);
      component = fixture.componentInstance;
     fixture.detectChanges();
     let errMsg = Observable.throw({"cod":"404","message":"city not found"});
    let spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
     expect(spy).toHaveBeenCalled();
     fixture.detectChanges();
     expect(component.selectedCity.city).toEqual('Dallas');
     let forecastSpy = spyOn(service,'getForecastInfo').and.returnValue(errMsg);
     service.getForecastInfo('Dalllas');
     expect(service.getForecastInfo).toHaveBeenCalledWith('Dalllas');
     expect(service.getForecastInfo).toHaveBeenCalledTimes(1);
   });

     
  
});
