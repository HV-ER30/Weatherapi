import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  getWeatherForecast(){
    return new Observable((observer)=>{
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          observer.next(position)
        },
        (error)=> {
          observer.next(error)
        }
      )
    }).pipe(
      map((value: any)=>{
        return new HttpParams()
        .set('lon', value.coords.longitude)
        .set('lat', value.coords.latitude)
        .set('units','imperial')
        .set('appid','4b48441715b1eec63861a6198f379718')
      }),
      switchMap((values)=>{
        return this.http.get('http://api.openweathermap.org/data/2.5/forecast', { params: values})
      })
    )
  }
}
