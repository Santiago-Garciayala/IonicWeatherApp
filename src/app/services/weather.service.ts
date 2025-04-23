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

  getCurrentWeather(pos: Position): Observable<any> {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${environment.OPEN_WEATHER_API_KEY}&units=metric`;
    return this.http.get(url);
  }

  getForecast3h5d(pos: Position): Observable<any> {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${environment.OPEN_WEATHER_API_KEY}&units=metric`;
    console.log(url);
    return this.http.get(url);
  }

  getIconUrl(id: string, scale?: number): string {
    let url: string = `https://openweathermap.org/img/wn/${id}@${scale}x.png`
    return url;
  }

  formatDT(dt: string): string {
    //use regex to format the date to the format HH:MM DD-MM from YYYY-MM-DD HH:MM:SS
    let formatted: string = dt.replace(
      /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):\d{2}$/,
      "$4:$5 $3-$2"
    );
    return formatted;
  }
}
