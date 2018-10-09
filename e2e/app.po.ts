import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getCitiesCount() {
    return element.all(by.css('app-weather'));
  }

  clickForecast(){
    let forecast = element(by.partialLinkText('10 Days Forecast'));
    forecast.click();
  }

  getDallasForecast(){
    return element(by.cssContainingText('#forecastCity', 'Forecast for Dallas'));
  }

  goToCurrentWeather(){
    let currentWeather = element(by.partialLinkText('Current Weather'));
    currentWeather.click();
  }

  isCityPresent(city){
    return element(by.cssContainingText('.loc-container.txt-cntr>span',city)).isDisplayed();
  }

  viewForecast(){
    let cityForecast = element(by.partialLinkText('View Forecast'));
    cityForecast.click();
  }

  getSelectedCityForecast(){
    return element(by.cssContainingText('#forecastCity', 'Forecast for Atlanta'));

  }
}
