import { Component } from '@angular/core';
import { map, pluck } from 'rxjs';

import { ForecastService } from '../services/forecast.service';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.scss']
})
export class FutureComponent {

  weatherData: any = [];
  primaryDisplay = true;
  secondaryDisplay = false;
  forecastDetails:any;



  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.forecastService.getWeatherForecast().pipe(
      map((data: any) => data.list)
    )
    .subscribe(data => {
      this.futureForecast(data)
    });
  }

  futureForecast(data:any){
    for(let i=0;i < data.length; i=i+8){
      this.weatherData.push(data[i]);
    }
    console.log(this.weatherData);
  }

  toggle(){
    this.primaryDisplay = !this.primaryDisplay;
    this.secondaryDisplay = !this.secondaryDisplay;
  }

  showDetails(data:any){
    this.forecastDetails = data;
  }
}
