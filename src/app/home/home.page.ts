import { Component, ElementRef, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { LatLng } from '@capacitor-community/capacitor-googlemaps-native/dist/esm/types/common/latlng.interface';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor() { }

  @ViewChild('map') mapView: ElementRef;

  ionViewDidEnter() {
    this.createMap();
  }

  createMap() {
      const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;

      CapacitorGoogleMaps.create({
        width: Math.round(boundingRect.width),
        height: Math.round(boundingRect.height),
        x: Math.round(boundingRect.x),
        y: Math.round(boundingRect.y),
        latitude: -33.86,
        longitude: 151.20,
        zoom: 12
      });

      CapacitorGoogleMaps.addListener("onMapReady", async () => {

        CapacitorGoogleMaps.setMapType({
          "type": "hybrid"
        });

        this.showCurrentPosition();

      })
  }

  showCurrentPosition() {
    Geolocation.requestPermissions().then(async permission => {
      const coordinates = await Geolocation.getCurrentPosition();

      CapacitorGoogleMaps.addMarker({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        title: "My castle of loneliness",
        snippet: 'Come and find me',
      });

      CapacitorGoogleMaps.setCamera({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        zoom: 12,
        bearing: 0,
      });

    });
  }
  draw() {
    const points : LatLng[] = [
      {
       latitude:51.88,
       longitude: 7.60,
      },
      {
        latitude:55,
        longitude: 10,
       }
    ];

    CapacitorGoogleMaps.addPolyline({
      points,
      color:'#ff00ff',
      width:2
    })
  }
}
