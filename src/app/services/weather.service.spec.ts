import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ConnectionBackend, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { WeatherService } from './weather.service';
import { API_KEY, currentWeatherUrl } from '../utils/weatherapp-constants';
import { Mock } from 'protractor/built/driverProviders';
import { connect } from 'net';

const mockResponse = {
  "cnt":4,"list":[{"coord":{"lon":-84.84,"lat":33.92},"sys":{"type":1,"id":749,"message":0.0036,"country":"US","sunrise":1538307192,"sunset":1538349888},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"main":{"temp":22.11,"pressure":1023,"humidity":73,"temp_min":19.4,"temp_max":24.1},"visibility":16093,"wind":{"speed":2.07,"deg":95.5002},"clouds":{"all":1},"dt":1538275834,"id":4190598,"name":"Dallas"},{"coord":{"lon":-94.16,"lat":33.11},"sys":{"type":1,"id":2674,"message":0.0044,"country":"US","sunrise":1538309417,"sunset":1538352135},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"main":{"temp":20.23,"pressure":1021,"humidity":93,"temp_min":19.4,"temp_max":21.1},"visibility":8047,"wind":{"speed":2.07,"deg":121.5},"clouds":{"all":90},"dt":1538275834,"id":4671576,"name":"Atlanta"},{"coord":{"lon":-83.05,"lat":42.33},"sys":{"type":1,"id":1460,"message":0.0049,"country":"US","sunrise":1538306900,"sunset":1538349310},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"main":{"temp":13,"pressure":1027,"humidity":44,"temp_min":11.7,"temp_max":14.2},"visibility":16093,"wind":{"speed":1.22,"deg":329.5},"clouds":{"all":90},"dt":1538275834,"id":4990729,"name":"Detroit"},{"coord":{"lon":80.28,"lat":13.09},"sys":{"type":1,"id":7834,"message":0.0035,"country":"IN","sunrise":1538267288,"sunset":1538310572},"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"main":{"temp":29,"pressure":1011,"humidity":83,"temp_min":29,"temp_max":29},"visibility":3500,"wind":{"speed":2.1,"deg":270},"clouds":{"all":40},"dt":1538275834,"id":1264527,"name":"Chennai"}]
};
describe('WeatherService', () => {
  let service: WeatherService;
  let spy: any;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        HttpClient,
        {provide: ConnectionBackend, useClass :MockBackend },
        WeatherService
      ]
    });
  });

  it('should be created', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));

  it('should  get Current Weather Info',inject([WeatherService, ConnectionBackend], 
    (service: WeatherService, mockBackend ) => {
      let expectedUrl = currentWeatherUrl+API_KEY;

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe(expectedUrl);

        connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(mockResponse)})));
      });

      service.getCurrentWeatherInfo().subscribe(res => {
        expect(res).toEqual(mockResponse);
        expect(mockResponse.cnt).toEqual(4);
      });
    }));

    it('should NOT get Current Weather Info',inject([WeatherService, ConnectionBackend], 
      (service: WeatherService, mockBackend ) => {
        let expectedUrl = currentWeatherUrl;
  
        mockBackend.connections.subscribe((connection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);
  
          connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(mockResponse)})));
        });
  
        service.getCurrentWeatherInfo().subscribe(res => {
          expect(res).toBeFalsy();
        });
      }));

      
    it('should get 10 days forecast',inject([WeatherService, ConnectionBackend], 
      (service: WeatherService, mockBackend ) => {
        let expectedUrl = "http://api.openweathermap.org/data/2.5/forecast?q=Chennai&cnt=10&APPID="+API_KEY;
  
        mockBackend.connections.subscribe((connection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);
  
          connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(mockResponse)})));
        });
  
        service.getCurrentWeatherInfo().subscribe(res => {
          expect(res).toEqual(mockResponse);
          expect(mockResponse.cnt).toEqual(10);
        });
      }));

      it('should NOT get 10 days forecast',inject([WeatherService, ConnectionBackend], 
        (service: WeatherService, mockBackend ) => {
          let expectedUrl = "http://api.openweathermap.org/data/2.5/forecast?q=Chennai&cnt=10&APPID="+API_KEY;
    
          mockBackend.connections.subscribe((connection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe(expectedUrl);
    
            connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(mockResponse)})));
          });
    
          service.getCurrentWeatherInfo().subscribe(res => {
            expect(res).toBeFalsy();
          });
        }));

  afterEach(()=>{
    service = null;
    spy = null;
  });
});
