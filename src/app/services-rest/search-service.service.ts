import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  urlC: string = 'http://localhost:4000/canal/';
  urlD: string = 'http://localhost:4000/distribuidor/';
  urlH: string = 'http://localhost:4000/horario/';
  urlP: string = 'http://localhost:4000/producto/';
  urlU: string = 'http://localhost:4000/usuario/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  
  getC(search: string){
    return this.http.get(`${this.urlC}?search=${search}`, this.httpOptions);
  }
  
  getD(search: string){
    return this.http.get(`${this.urlD}?search=${search}`, this.httpOptions);
  }
  
  getH(search: string){
    return this.http.get(`${this.urlH}?search=${search}`, this.httpOptions);
  }
  
  getP(search: string){
    return this.http.get(`${this.urlP}?search=${search}`, this.httpOptions);
  }
  
  getU(search: string){
    return this.http.get(`${this.urlU}?search=${search}`, this.httpOptions);
  }
}
