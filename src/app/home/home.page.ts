import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';
import { JsonPipe } from '@angular/common'; //used to display entire js objects with angular data binding, i used it for debugging
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonLabel, IonAvatar } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; //for using Swiper, https://ionicframework.com/docs/angular/slides

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, JsonPipe, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonLabel, IonAvatar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //for using Swiper
})
export class HomePage implements OnInit {
  title: string = "Ionic Weather App"
  location: any;
  weatherServPublic: any; //workaround to be able to use the service in the html since its normally private
  currentWeather: any;
  weatherForecast: any;
  constructor(private locationService: LocationService, private weatherService: WeatherService) { }

  async ngOnInit(): Promise<void> {
    this.weatherServPublic = this.weatherService;
    this.location = await this.locationService.getCoordinates();
    this.weatherService.getCurrentWeather(this.location).subscribe({
      next: (w) => {
        this.currentWeather = w;
      },
      error: (e) => {
        //show error screen
        console.error(e);
      }
    });
    this.weatherService.getForecast3h5d(this.location).subscribe({
      next: (w) => {
        this.weatherForecast = w;
      },
      error: (e) => {
        //show error screen
        console.error(e);
      }
    });
  }

}
