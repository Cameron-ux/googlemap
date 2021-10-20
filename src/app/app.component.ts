import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    CapacitorGoogleMaps.initialize({
      key: environment.mapsKey
    });
  }
}
