import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";


interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
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
  marker: [number, number] = [-74.11128752322286, 4.756472555009085];

  constructor() { }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage();

    // const markerHtml : HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';
    // const marker = new mapboxgl.Marker({
    //   element: markerHtml  // en esta parte podemos agregar un elemento texto, imagen  o lo que se requiera
    // })
    //   .setLngLat(this.center)
    //   .addTo( this.mapa );
  }

 
/**
 * It creates a new marker, sets its color, sets its position, adds it to the map, and then adds it to
 * the array of markers
 */
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

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage()
    })
  }

  /**
   * It takes a marker as a parameter and then flies to the marker's location
   * @param marker - mapboxgl.Marker - The marker to fly to.
   */
  irMarcador( marker: mapboxgl.Marker){
    this.mapa.flyTo({
      center : marker.getLngLat()
    });
  }

 /**
  * We're looping through the array of markers, getting the color and the longitude and latitude of
  * each marker, and then pushing that data into a new array. 
  * 
  * We're then saving that new array to local storage. 
  * 
  * The reason we're doing this is because we want to be able to load the markers from local storage
  * when the user refreshes the page. 
  * 
  * We'll do that in the next function.
  */
  guardarMarcadoresLocalStorage(){

    const lgnLatArr: MarcadorColor[] = [];

    this.marcadores.forEach( m => {

      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lgnLatArr.push({
        color: color,
        centro: [lng, lat]
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lgnLatArr));

  }



 /**
  * We're checking if there's anything in local storage, if there is, we're parsing the JSON string
  * into an array of objects, and then we're looping through that array and creating a new marker for
  * each object
  */
  leerLocalStorage() {

    if(!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArr.forEach( m => {


      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat( m.centro! )
        .addTo(this.mapa);

        this.marcadores.push({
          marker: newMarker,
          color: m.color
        });

        newMarker.on('dragend', () => {
          this.guardarMarcadoresLocalStorage()
        })
    })  
  }


/**
 * It removes the marker from the map, removes the marker from the array, and saves the array to local
 * storage
 * @param {number} i - number - The index of the marker to be deleted.
 */
  borrarMarcador(i: number) {
    
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadoresLocalStorage();
  }

  

}
