import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map
  zoomLevel: number = 10;
  center: [number, number] = [-74.11128752322286, 4.756472555009085];
 

  constructor() { }
  
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {})
    this.mapa.off('zoomend', () => {})
    this.mapa.off('move', () => {})
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    //creacion de un EventListener
    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev) => {
      if( this.mapa.getZoom() > 18) {
        this.mapa.zoomTo( 18 );  // zoomTo es un metodo que indica a que numero de zoom debe ir
      }
    });

    // movimiento  del mapa
    this.mapa.on('move', (ev) => {
      const target = ev.target;
      const {lng, lat} = target.getCenter();
      this.center = [lng, lat];

      target.getCenter()
    })

  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomOut(){
    this.mapa.zoomOut();
  }

  zoomCambio(valor: string) {
    this.mapa.zoomTo( Number(valor))
  }

}
