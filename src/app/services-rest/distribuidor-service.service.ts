import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Distribuidor } from '../models/distribuidor.model';
import { DistribuidorResponse } from '../interfaces/distribuidor-interface';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DistribuidorServiceService {

  distribuidor: Distribuidor[];
  url: string = 'http://localhost:4000/distribuidor/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  

  constructor(private http: HttpClient) { 
    
  }

  saveD(distribuidor: Distribuidor){
    return this.http.post(`${this.url}`, distribuidor, this.httpOptions)
  }

  editD(codigo: number, update: Distribuidor ){
    return this.http.put(`${this.url}${codigo}`, update, this.httpOptions);
  }

  removeD(codigo: number | string){
    return this.http.delete(`${this.url}${codigo}`, this.httpOptions);
  }

  getD(search: string){
    return this.http.get(`${this.url}?${search}`, this.httpOptions);
  }

  getAll(){
    return this.http.get<DistribuidorResponse>(`${this.url}all`, this.httpOptions).pipe(
      map( data => data.distribuidores)
    )

  }

  getPk(codigo: number){
    return this.http.get(`${this.url}${codigo}`, this.httpOptions);
  }
}
