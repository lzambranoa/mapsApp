import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    
    `
    .mapa-container {
      width: 100%;
      height: 100%;
    }

    .row {
      background-color: black;
      color: white;
      position: fixed;
      padding: 10px;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      z-index: 999;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.11128752322286, 4.756472555009085],
      zoom: 16
    });
  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomOut(){
    this.mapa.zoomOut();
  }

}
