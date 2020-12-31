import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceLocalProductoService {

  producto: Producto[] = [];

  constructor() {
    this.cargarProductos();
  }

  crearProducto(codigo: number, descripcion: string, monto: string, distribuidorCodigo: number){

    const nuevoProducto = new Producto(descripcion, monto, distribuidorCodigo, codigo);
    this.producto.push(nuevoProducto);
    this.guardarStorage();

    return nuevoProducto.codigo;
  }

  obtenerProducto(codigo: string | number){

    codigo = Number(codigo);
    return this.producto.find( resp => resp.codigo === codigo);

  }

  eliminarProducto(codigo: string | number){
    codigo = Number(codigo);
     this.producto =  this.producto.filter( resp => resp.codigo !== codigo );
    this.guardarStorage();
    return this.producto;
  }

  cargarProductos(){


    if(localStorage.getItem('productos')){
      this.producto = JSON.parse(localStorage.getItem('productos'));
    }else{
      this.producto = [];
    }

  }


  guardarStorage(){
    localStorage.setItem('productos', JSON.stringify(this.producto));
  }
}
