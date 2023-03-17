import { Component } from '@angular/core';
import { ForecastService } from '../services/forecast.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent {

  timeline: { time: string, temp: number }[] = [];
  weatherNow: any;
  currentTime = new Date();
  location: any;

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.forecastService.getWeatherForecast().subscribe(data => {
      this.getTodayForecast(data)
    });
  }

  dateRange() {
    const start = new Date();
    // start.setHours(start.getHours() + (start.getTimezoneOffset()/60))
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds()+ 59);

    return {start ,to}
    }

  getTodayForecast(today: any): void {
    this.location = today.city;

    for (const forecast of today.list.slice(0, 8)) {
      this.timeline.push({
        time: forecast.dt_txt,
        temp: forecast.main.temp
      });

      const apiDate = new Date(forecast.dt_txt).getTime();

      if(this.dateRange().start.getTime() <= apiDate && this.dateRange().to.getTime() >= apiDate){
        this.weatherNow = forecast;
        console.log(this.weatherNow);
      }
    }
  }
}
