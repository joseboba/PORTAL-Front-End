import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Canal } from '../models/canal.model';
import { Distribuidor } from '../models/distribuidor.model';
import { Horario } from '../models/horario.model';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  canal: Canal[];
  distribuidor: Distribuidor[];
  horario: Horario[];
  producto: Producto[];
  usuario: Usuario[];

  constructor() { 
    this.canal = JSON.parse(localStorage.getItem('canales'));
    this.distribuidor = JSON.parse(localStorage.getItem('distribuidores'));
    this.horario = JSON.parse(localStorage.getItem('horarios'));
    this.producto = JSON.parse(localStorage.getItem('productos'));
    this.usuario = JSON.parse(localStorage.getItem('usuarios'));
  }


  buscarUsuario( search: string ){
    return this.usuario.filter( resp => resp.nombre.includes(search) || resp.correo.includes(search) || resp.telefono.includes(search) );
  }

  buscarProducto( search: string ){
    return this.producto.filter( resp => resp.descripcion.includes(search) || resp.monto.includes(search)  );
  }

  buscarHorario( search: string ){
    return this.horario.filter( resp => resp.start.toString().includes(search) || resp.end.toString().includes(search)  );
  }

  buscarDistribuidor( search: string ){
    return this.distribuidor.filter( resp => resp.nombre.includes(search) || resp.correoNotificacion.includes(search) || resp.correoNotificacion.includes(search) );
  }

  buscarCanal( search: string ){
    return this.canal.filter( resp => resp.nombre.includes(search)  );
  }



}
