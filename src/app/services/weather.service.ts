import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Position } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherInfo(pos: Position): Observable<any> {

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${environment.OPEN_WEATHER_API_KEY}&units=metric`;
    console.log(url);
    return this.http.get(url);
  }
}
