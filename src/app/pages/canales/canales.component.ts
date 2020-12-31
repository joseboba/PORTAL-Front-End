import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Canal } from '../../models/canal.model';
import { ServiceLocalCanalService } from '../../services-local/service-local-canal.service';
import { Distribuidor } from '../../models/distribuidor.model';
import { environment } from '../../../environments/environment';
import { CanalServiceService } from '../../services-rest/canal-service.service';
import { DistribuidorServiceService } from '../../services-rest/distribuidor-service.service';
import { environment as environmentProd } from '../../../environments/environment.prod';


@Component({
  selector: 'app-canales',
  templateUrl: './canales.component.html',
  styleUrls: ['./canales.component.css']
})
export class CanalesComponent implements OnInit {

  canalForm: FormGroup;
  canal: Canal[] = [];
  distribuidores: Distribuidor[] = [];
  canalUpdate: Canal;

  constructor(private fb: FormBuilder, 
              private service: ServiceLocalCanalService, 
              private serveRest: CanalServiceService,
              private serviceDistribuidor: DistribuidorServiceService ) {
    this.crearFormulario();
    this.cargarCanal();
  }

  ngOnInit(): void {
   
  }

  get nombreNoValido(){
    return this.canalForm.get('nombre').invalid && this.canalForm.get('nombre').touched
  }

  get distribuidorNoValido(){
    return this.canalForm.get('distribuidorControl').invalid && this.canalForm.get('distribuidorControl').touched
  }

  crearFormulario(){
    this.canalForm = this.fb.group({
      nombre: ['', [ Validators.required ]],
      distribuidorControl: ['', [Validators.required]]
    })
  }

  guardar(){

    if(this.canalForm.invalid){
      Object.values( this.canalForm.controls ).forEach( control => {
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAsTouched());
          return;
        }else{
          control.markAsTouched();
          return;
        }
      })
      return;
    }

    if(!environment.production || !environmentProd.production){
      if(Number(this.canalForm.value.distribuidorControl)){
        const codigo = Number(localStorage.getItem('codigoC')) + 1;
        localStorage.setItem('codigoC', codigo.toString());
        const nombre = this.canalForm.value.nombre;
        const distribuidorCodigo = Number(this.canalForm.value.distribuidorControl);
        
        this.service.crearCanal(codigo, nombre, distribuidorCodigo);
        this.canalForm.reset();
      }else{
        return;
      }
    }else{
      const nombre: string = this.canalForm.value.nombre.toString()
      const distribuidorCodigo: number = Number(this.canalForm.value.distribuidorControl);
  
      const canal: Canal = {nombre, distribuidorCodigo};
      this.serveRest.saveC(canal).subscribe( data => this.cargarCanal() )
    }

    
  }

  editar(){

    this.canalUpdate.nombre = this.canalForm.value.nombre;
    this.canalUpdate.distribuidorCodigo = this.canalForm.value.distribuidorControl;
    
    if(!environment.production || !environmentProd.production){
      this.service.canal.map( data => data.codigo === this.canalUpdate.codigo ? this.canalUpdate : data );
      this.service.guardarStorage();
      this.canalForm.reset();
      this.canalUpdate = null;
    }else{
      this.serveRest.editC(this.canalUpdate.codigo, this.canalUpdate).subscribe( data => this.cargarCanal());
  
      this.canalForm.reset();
      this.canalUpdate = null;
    }


  }


  editarCanal(canal: Canal){

    this.canalUpdate = canal;
    this.canalForm.reset({
      nombre: canal.nombre,
      distribuidorControl: canal.distribuidorCodigo
    })

  }

  cargarCanal(){
    
    if(!environment.production || !environmentProd.production){
      this.canal = this.service.canal;
      this.distribuidores = JSON.parse(localStorage.getItem('distribuidores'));
   
      if(!localStorage.getItem('codigoC')){
        localStorage.setItem('codigoC', '0');
      }
    }else{
      this.serveRest.getAll().subscribe( data  => this.canal = data)
      this.serviceDistribuidor.getAll().subscribe( data => this.distribuidores = data)
    }


  }

}
