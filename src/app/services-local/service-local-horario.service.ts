import { Injectable } from '@angular/core';
import { Horario } from '../models/horario.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceLocalHorarioService {

  horario: Horario[] = [];

  constructor() {
    this.cargarHorarios();
  }

  crearhorario(codigo: number, start: string, end: string, distribuidorCodigo: number){

    const nuevoHorario = new Horario( start, end, distribuidorCodigo, codigo);
    this.horario.push(nuevoHorario);
    this.guardarStorage();

    return nuevoHorario.codigo;
  }

  obtenerHorario(codigo: string | number){

    codigo = Number(codigo);
    return this.horario.find( resp => resp.codigo === codigo);

  }

  eliminarhorario(codigo: string | number){
    codigo = Number(codigo);
    this.horario = this.horario.filter( resp => resp.codigo !== codigo );
    this.guardarStorage();
    return this.horario;
  }

  cargarHorarios(){


    if(localStorage.getItem('horarios')){
      this.horario = JSON.parse(localStorage.getItem('horarios'));
    }else{
      this.horario = [];
    }

  }

  guardarStorage(){
    localStorage.setItem('horarios', JSON.stringify(this.horario));
  }
}
