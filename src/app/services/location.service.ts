import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Observable } from 'rxjs';
import { Position } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  async getCoordinates(): Promise<Position> {
    let location: any = await Geolocation.getCurrentPosition();

    return location;
  }

  getCities(query: string): Observable<any> {
    let url: string = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${environment.OPEN_WEATHER_API_KEY}&limit=5`
    return this.http.get(url);
  }
}
