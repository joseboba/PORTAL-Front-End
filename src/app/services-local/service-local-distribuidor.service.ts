import { Injectable } from '@angular/core';
import { Distribuidor } from '../models/distribuidor.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceLocalDistribuidorService {

  
  distribuidor: Distribuidor[] = [];

  constructor() {
    this.cargarDistribuidores();
  }

  crearDistribuidor(codigo: number, nombre: string, correoNotificacion: string, correoAlerta: string){

    const nuevoDistribuidor = new Distribuidor(nombre, correoNotificacion, correoAlerta, codigo);
    this.distribuidor.push(nuevoDistribuidor);
    this.guardarStorage();

    return nuevoDistribuidor.codigo;
  }

  obtenerDistribuidor(codigo: string | number){

    codigo = Number(codigo);
    return this.distribuidor.find( resp => resp.codigo === codigo);

  }

  eliminarDistribuidor(codigo: string | number){
    codigo = Number(codigo);
    this.distribuidor = this.distribuidor.filter( resp => resp.codigo !== codigo );
    this.guardarStorage();
    return this.distribuidor;
  }

  cargarDistribuidores(){


    if(localStorage.getItem('distribuidores')){
      this.distribuidor = JSON.parse(localStorage.getItem('distribuidores'));
    }else{
      this.distribuidor = [];
    }

  }



  guardarStorage(){
    localStorage.setItem('distribuidores', JSON.stringify(this.distribuidor));
  }
}
