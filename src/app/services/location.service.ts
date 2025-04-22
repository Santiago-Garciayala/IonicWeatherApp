import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Observable } from 'rxjs';
import { Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  async getCoordinates(): Promise<Position> {
    let location: any = await Geolocation.getCurrentPosition();

    return location;
  }
}
