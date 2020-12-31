import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Canal } from '../models/canal.model';
import { CanalResponse, CanalSave } from '../interfaces/canal-interface';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class CanalServiceService {

  canal: Canal[];
  url: string = 'http://localhost:4000/canal/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
 

  constructor(private http: HttpClient) { 
    
  }


  saveC(canal: Canal){
    return this.http.post<CanalSave>(`${this.url}`, canal, this.httpOptions)
  }

  editC(codigo: number | string, canal: Canal ){
    return this.http.put(`${this.url}${codigo}`, JSON.stringify(canal), this.httpOptions);
  }

  removeC(codigo: number | string){
    return this.http.delete(`${this.url}${codigo}`, this.httpOptions);
  }

  getC(search: string){
    return this.http.get(`${this.url}?${search}`, this.httpOptions);
  }

  getAll(){
    return this.http.get<CanalResponse>(`${this.url}all`, this.httpOptions).pipe(
      map( data => data.canal)
    )

  }

  getPk(codigo: number){
    return this.http.get(`${this.url}${codigo}`, this.httpOptions);
  }

}
