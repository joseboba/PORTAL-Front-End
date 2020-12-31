import { Injectable } from '@angular/core';
import { Horario } from '../models/horario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HorarioResponse } from '../interfaces/horario-interface';

@Injectable({
  providedIn: 'root'
})
export class HorarioServiceService {

  horario: Horario[];
  url: string = 'http://localhost:4000/horario/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  

  constructor(private http: HttpClient) { 
    
  }

  saveH(horario: Horario){
    return this.http.post(`${this.url}`, horario, this.httpOptions);
  }

  editH(codigo: number, update: Horario ){
    return this.http.put(`${this.url}${codigo}`, update, this.httpOptions);
  }

  removeDH(codigo: number | string){
    return this.http.delete(`${this.url}${codigo}`, this.httpOptions);
  }

  getH(search: string){
    return this.http.get(`${this.url}?${search}`, this.httpOptions);
  }

  getAll(){
    return this.http.get<HorarioResponse>(`${this.url}all`, this.httpOptions).pipe(
      map( data => data.horario)
    )

  }

  getPk(codigo: number){
    return this.http.get(`${this.url}${codigo}`, this.httpOptions);
  }
}
