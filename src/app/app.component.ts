import { Component } from '@angular/core';
import { InfoPaginaService } from './servies/info-pagina.service';
import { ProductosService } from './servies/productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( public _infoPagina: InfoPaginaService,
               public productosServices: ProductosService) {

              }


}
