import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('Weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display weather in Header', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Weather');
  });

  it('should display weather info for 4 cities',()=>{
    expect(page.getCitiesCount().count()).toBe(4);
  });

  it('should display 10days forecast for Dallas', ()=>{
    page.clickForecast();
    expect(page.getDallasForecast().getText()).toEqual('Forecast for Dallas');
  });

  it('should navigate to Current Weather Page', ()=> {
    page.goToCurrentWeather();
    expect(page.getCitiesCount().count()).toBe(4);
  });  
});