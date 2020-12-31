import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductoResponse } from '../interfaces/producto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  producto: Producto[];
  url: string = 'http://localhost:4000/producto/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  

  constructor(private http: HttpClient) { 
    
  }

  saveP(producto: Producto){
    return this.http.post(`${this.url}`, producto, this.httpOptions);
  }

  editP(codigo: number, update: Producto ){
    return this.http.put(`${this.url}${codigo}`, update, this.httpOptions);
  }

  removeP(codigo: number | string){
    return this.http.delete(`${this.url}${codigo}`, this.httpOptions);
  }

  getP(search: string){
    return this.http.get(`${this.url}?${search}`, this.httpOptions);
  }

  getAll(){
    return this.http.get<ProductoResponse>(`${this.url}all`, this.httpOptions).pipe(
      map( (data:ProductoResponse) => data.productos)
    )

  }

  getPk(codigo: number){
    return this.http.get(`${this.url}${codigo}`, this.httpOptions);
  }
}
