import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast.component';

@NgModule({
  imports: [
    CommonModule,
    ForecastRoutingModule,
    FormsModule
  ],
  declarations: [ForecastComponent],
  exports: []
})
export class ForecastModule { }
