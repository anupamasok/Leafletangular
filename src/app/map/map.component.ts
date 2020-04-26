import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import * as geolib from 'geolib';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private map;

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // using geolib library we can convert
    // sexagecimal inputs to decimal values. So
    // if the data is int sexagecimal, we just need
    // to run the data convert it using the below
    // sexagesimalToDecimal function
    var x1 = geolib.sexagesimalToDecimal(`9° 58' 37" N`);
    var x2 = geolib.sexagesimalToDecimal(`9° 58' 40" N`);
    var x3 = geolib.sexagesimalToDecimal(`9° 58' 41" N`);
    var y1 = geolib.sexagesimalToDecimal(`76° 16' 38" E`);
    var y2 = geolib.sexagesimalToDecimal(`76° 16' 39" E`);
    var y3 = geolib.sexagesimalToDecimal(`76° 16' 38" E`);

    // this part creates the map using Leaflet
    // we can specifyt the default place the map centers in to
    // and the zoom level the map starts from.
    this.map = L.map('map', {
      center: [x1, y1],
      zoom: 19,
    });

    // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http:q//www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    // for reference : https://github.com/Leaflet/Leaflet.heat
    L.heatLayer(
      [
        [-25.290917, -57.5428, 0.2], // lat, lng, intensity
        [x2, y2, 0.95], // lat, lng, intensity
        [x1, y1, 0.75], // lat, lng, intensity
        [x3, y3, 0.75], // lat, lng, intensity
        [-25.290474, -57.542227, 0.5],
        [-25.290074, -57.543067, 0.6],
      ],
      {
        radius: 100,
        minOpacity: 0.35,
        blur: 15,
        // gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' },
      }
    ).addTo(this.map);
  }
}
