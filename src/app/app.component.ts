import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

register(); //for using swiper

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {
  constructor() { }
}
