import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductoInterface[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }



  private cargarProductos() {

    return new Promise( (resolve, reject) => {
      this.http.get('https://angular-html-c5224.firebaseio.com/productos_idx.json')
        .subscribe( (resp: ProductoInterface[]) => {
          console.log( resp );
          this.productos = resp;
          this.cargando = false;
          resolve();
      });
    });


  }

  getProducto(id: string) {

    return this.http.get(`https://angular-html-c5224.firebaseio.com/productos/${ id }.json`);

  }

  buscarProducto( termino: string ) {

    if (this.productos.length === 0) {
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos( termino );
      });
    } else {
      // Aplicar filtro
      this.filtrarProductos( termino );
    }


  }

  private filtrarProductos(  termino: string) {
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push( prod );
      }
    });

  }
}
