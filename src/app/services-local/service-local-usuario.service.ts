import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceLocalUsuarioService {

  usuario: Usuario[] = [];

  constructor() {
    this.cargarUsuarios();
  }

  crearUsuario(codigo: number, nombre: string, correo: string, telefono: string, distribuidorCodigo: number){

    const nuevoUsuario = new Usuario(nombre, correo, telefono, distribuidorCodigo, codigo);
    this.usuario.push(nuevoUsuario);
    this.guardarStorage();

    return nuevoUsuario.codigo;
  }

  obtenerUsuario(codigo: string | number){

    codigo = Number(codigo);
    return this.usuario.find( resp => resp.codigo === codigo);

  }

  eliminarUsuario(codigo: string | number){
    codigo = Number(codigo);
    this.usuario = this.usuario.filter( resp => resp.codigo !== codigo );
    this.guardarStorage();
    return this.usuario;
  }

  cargarUsuarios(){


    if(localStorage.getItem('usuarios')){
      this.usuario = JSON.parse(localStorage.getItem('usuarios'));
    }else{
      this.usuario = [];
    }

  }


  guardarStorage(){
    localStorage.setItem('usuarios', JSON.stringify(this.usuario));
  }


}
