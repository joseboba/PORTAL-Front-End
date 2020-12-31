import { Injectable } from '@angular/core';
import { Canal } from '../models/canal.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceLocalCanalService {

  
  canal: Canal[] = [];

  constructor() {
    this.cargarCanales();
  }

  crearCanal(codigo: number, nombre: string, distribuidorCodigo: number){

    const nuevoCanal = new Canal(nombre, distribuidorCodigo, codigo);
    this.canal.push(nuevoCanal);
    this.guardarStorage();

    return nuevoCanal.codigo;
  }

  obtenerCanal(codigo: string | number){

    codigo = Number(codigo);
    return this.canal.find( resp => resp.codigo === codigo);

  }

  eliminarCanal(codigo: string | number){
    codigo = Number(codigo);
    this.canal = this.canal.filter( resp => resp.codigo !== codigo );
    this.guardarStorage();
    return this.canal;
  }

  cargarCanales(){


    if(localStorage.getItem('canales')){
      this.canal = JSON.parse(localStorage.getItem('canales'));
    }else{
      this.canal = [];
    }

  }

 
  guardarStorage(){
    localStorage.setItem('canales', JSON.stringify(this.canal));
  }
}
