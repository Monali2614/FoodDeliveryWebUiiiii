import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent {
  latitude?: number;
  longitude?: number;
  map: L.Map | undefined;

  ngOnInit() {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13); // Default location

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          
          if (this.map) {
            this.map.setView([this.latitude, this.longitude], 13);

            L.marker([this.latitude, this.longitude]).addTo(this.map)
              .bindPopup('You are here!')
              .openPopup();
          }
        },
        (error) => {
          console.error('Error retrieving location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}