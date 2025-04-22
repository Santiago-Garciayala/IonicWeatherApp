import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';
import { JsonPipe } from '@angular/common'; //used to display entire js objects with angular data binding, i used it for debugging

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, JsonPipe],
})
export class HomePage implements OnInit {
  title: string = "Ionic Weather App"
  location: any;
  weatherObj: any;
  constructor(private locationService: LocationService, private weatherService: WeatherService) { }

  async ngOnInit(): Promise<void> {
    this.location = await this.locationService.getCoordinates();
    this.weatherService.getWeatherInfo(this.location).subscribe({
      next: (w) => {
        this.weatherObj = w;
      },
      error: (e) => {
        //show error screen
        console.error(e);
      }
    });
  }

}
