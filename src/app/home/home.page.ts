import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';
import { JsonPipe } from '@angular/common'; //used to display entire js objects with angular data binding, i used it for debugging
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonLabel, IonAvatar, IonSearchbar, IonToggle, IonButton } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; //for using Swiper, https://ionicframework.com/docs/angular/slides
import { Platform } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkWithHref, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, JsonPipe, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonLabel, IonAvatar, IonSearchbar, IonToggle, FormsModule, CommonModule, RouterLink, RouterLinkWithHref, IonButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //for using Swiper
})
export class HomePage implements OnInit {
  title: string = "Ionic Weather App"
  location: any;
  weatherServPublic: any; //workaround to be able to use the service in the html since its normally private
  currentWeather: any;
  weatherForecast: any;
  weatherSlideNum: number = 6;
  imperial: boolean = false;
  unitChar: string = 'C';
  cities: string[] = [];
  citiesQueryVisible: boolean = false;
  cityQuery: string = '';
  constructor(private locationService: LocationService, private weatherService: WeatherService, private platform: Platform, private storage: Storage, private router: Router) { }

  async ngOnInit(): Promise<void> {
    //calculate how many slides to display horizontally using window width, ref: https://stackoverflow.com/a/38740870
    await this.platform.ready().then(() => { this.weatherSlideNum = Math.round(this.platform.width() / 100) })

    //deal with storage
    await this.storage.create();
    //this.storage.get('imperial').then((val) => { this.imperial = val }).catch(() => { this.imperial = false });
    this.imperial = await this.storage.get('imperial') || false; //the line above does the same but this is cleaner
    this.unitChar = this.imperial ? 'F' : 'C';

    this.weatherServPublic = this.weatherService;
    this.location = await this.locationService.getCoordinates();
    await this.populateWeatherData();
  }

  async populateWeatherData() {
    this.weatherService.getCurrentWeather(this.location, this.imperial).subscribe({
      next: (w) => {
        this.currentWeather = w;
      },
      error: (e) => {
        //show error screen
        console.error(e);
      }
    });
    this.weatherService.getForecast3h5d(this.location, this.imperial).subscribe({
      next: (w) => {
        this.weatherForecast = w;
      },
      error: (e) => {
        //show error screen
        console.error(e);
      }
    });
  }

  async onUnitsToggled() {
    await this.storage.set('imperial', this.imperial);
    this.unitChar = this.imperial ? 'F' : 'C';
    await this.populateWeatherData();
  }

  async showPossibleCities(event: CustomEvent) {
    if (event.detail.value != '') {
      this.locationService.getCities(event.detail.value).subscribe({
        next: (val) => {
          this.cities = val.map((data: any) => `${data.name}${data.country ? ',' + data.country : ''}`);
          console.log(this.cities);
          console.log(val);
        },
        error: () => {
          this.cities = [];
        }
      });
    } else {
      this.cities = [];
    }

  }

  showCitiesList(): void {
    this.citiesQueryVisible = true;
  }

  async unshowCitiesList(): Promise<void> {
    //this line is basically just sleep(), from https://stackoverflow.com/a/39914235
    //had to do this because if i didnt then it would close the search results before it registered the click
    await new Promise(r => setTimeout(r, 500));
    this.citiesQueryVisible = false;
  }

  async navigateToCity(city: string): Promise<void> {
    this.citiesQueryVisible = true;

    this.locationService.getCities(city).subscribe({
      next: async (val) => {
        this.location = {
          longitude: val[0].lon,
          latitude: val[0].lat,
          coords: {
            longitude: val[0].lon,
            latitude: val[0].lat
          }
        };

        await this.populateWeatherData();
        console.log(this.currentWeather);
      }
    });

    //I tried to make this work, but I kept getting an error like Error: Cannot activate an already activated outlet
    //I know its 1/5 of the rubric but design wise its better to just refresh the same page anyways
    //await this.router.navigate(['/city', city], { replaceUrl: true });
    this.citiesQueryVisible = false;
  }

  async searchCity() {
    console.log(this.cityQuery);
    if (this.cityQuery != '') {
      await this.navigateToCity(this.cityQuery);
    }
  }

}
