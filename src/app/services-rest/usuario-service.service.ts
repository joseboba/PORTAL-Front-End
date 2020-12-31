import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UsuarioReponse } from '../interfaces/usuario-interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  usuario: Usuario[];
  url: string = 'http://localhost:4000/usuario/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  

  constructor(private http: HttpClient) { 
    
  }

  saveU(usuario: Usuario){
    return this.http.post(`${this.url}`, usuario, this.httpOptions);
  }

  editU(codigo: number, update: Usuario ){
    return this.http.put(`${this.url}${codigo}`, update, this.httpOptions);
  }

  removeU(codigo: number | string){
    return this.http.delete(`${this.url}${codigo}`, this.httpOptions);
  }

  getU(search: string){
    return this.http.get(`${this.url}?${search}`, this.httpOptions);
  }

  getAll(){
    return this.http.get<UsuarioReponse>(`${this.url}all`, this.httpOptions).pipe(
      map( (data:UsuarioReponse) => data.usuarios)
    )

  }

  getPk(codigo: number){
    return this.http.get(`${this.url}${codigo}`, this.httpOptions);
  }
}
