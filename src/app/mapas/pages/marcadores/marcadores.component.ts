import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";


interface MarcadorColor {
  color: string;
  marker: mapboxgl.Marker
}
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      width: 100%;
      height: 100%;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
    }

    li {
      cursor: pointer;
    }
    `
  ]
})


export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map
  zoomLevel: number = 15;
  center: [number, number] = [-74.11128752322286, 4.756472555009085];

  //Arreglo de marcadores
  marcadores: MarcadorColor[] = [];

  constructor() { }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // const markerHtml : HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';
    // const marker = new mapboxgl.Marker({
    //   element: markerHtml  // en esta parte podemos agregar un elemento texto, imagen  o lo que se requiera
    // })
    //   .setLngLat(this.center)
    //   .addTo( this.mapa );
  }

  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo( this.mapa)

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });
  }

  irMarcador(){

  }
  

}
