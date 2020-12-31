import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Distribuidor } from '../../models/distribuidor.model';
import { ServiceLocalDistribuidorService } from '../../services-local/service-local-distribuidor.service';
import { DistribuidorServiceService } from '../../services-rest/distribuidor-service.service';
import { environment } from '../../../environments/environment';
import { environment as environmentProd } from '../../../environments/environment.prod';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-distribuidor',
  templateUrl: './distribuidor.component.html',
  styleUrls: ['./distribuidor.component.css']
})
export class DistribuidorComponent implements OnInit {

  distribuidorForm: FormGroup;
  distribuidor: Distribuidor[] = [];
  distribuidorUpdate: Distribuidor;


  constructor(private fb: FormBuilder, private service: ServiceLocalDistribuidorService, private serviceD: DistribuidorServiceService) {
    this.crearFormulario();
    this.cargarDistribuidor();

  }

  ngOnInit(): void {
  }


  get nombreNoValido(){
    return this.distribuidorForm.get('nombre').invalid && this.distribuidorForm.get('nombre').touched
  }

  get correoNotificacionNoValido(){
    return this.distribuidorForm.get('correoNotificacion').invalid && this.distribuidorForm.get('correoNotificacion').touched
  }

  get correoAlertaNoValido(){
    return this.distribuidorForm.get('correoAlerta').invalid && this.distribuidorForm.get('correoAlerta').touched
  }

  crearFormulario(){
    this.distribuidorForm = this.fb.group({
      nombre: ['', [ Validators.required ]],
      correoNotificacion: [ '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      correoAlerta: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    })
  }


  guardar(){

    if(this.distribuidorForm.invalid){
      Object.values( this.distribuidorForm.controls ).forEach( control => {
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

    if(!environment || !environmentProd.production){ 
      const codigo = Number(localStorage.getItem('codigoD')) + 1;
      localStorage.setItem('codigoD', codigo.toString());
      const nombre = this.distribuidorForm.value.nombre.trim();
      const correoNotificacion = this.distribuidorForm.value.correoNotificacion.trim();
      const correoAlerta = this.distribuidorForm.value.correoAlerta.trim();
  
      this.service.crearDistribuidor(codigo, nombre, correoNotificacion, correoAlerta);
      this.distribuidorForm.reset();
    }else{
      const nombre = this.distribuidorForm.value.nombre.toString().trim();
      const correoNotificacion = this.distribuidorForm.value.correoNotificacion.toString().trim();
      const correoAlertas = this.distribuidorForm.value.correoAlerta.toString().trim();
  
      const distribuidor: Distribuidor = { nombre, correoNotificacion, correoAlertas };
  
      this.serviceD.saveD(distribuidor).subscribe( (data:any) => {
        if(!data.ok){
          Swal.fire({
            title: 'Error',
            text: data.msg,
            icon: 'error'
          })
          console.log(data);
        }else{
          this.cargarDistribuidor()
        }
      });
      this.distribuidorForm.reset();
    }

   
  }

  

  editar(){
  
    this.distribuidorUpdate.nombre  = this.distribuidorForm.value.nombre.trim();
    this.distribuidorUpdate.correoAlertas = this.distribuidorForm.value.correoAlerta.trim();
    this.distribuidorUpdate.correoNotificacion = this.distribuidorForm.value.correoNotificacion.trim();

    if(!environment.production || !environmentProd.production){
      this.service.distribuidor.map( data => data.codigo === this.distribuidorUpdate.codigo ? this.distribuidorUpdate : data);
      this.service.guardarStorage(); 
      this.distribuidorUpdate = null;
      this.distribuidorForm.reset();

    }else{
      this.serviceD.editD(this.distribuidorUpdate.codigo, this.distribuidorUpdate).subscribe( (data:any) => {
        if(!data.ok){
          Swal.fire({
            title: 'Error',
            text: data.msg,
            icon: 'error'
          })
          this.cargarDistribuidor();
        }else{
          this.cargarDistribuidor()
        }
      })
  
      this.distribuidorUpdate = null;
      this.distribuidorForm.reset();
    }

 

  }

  editarDistribuidor(distribuidor: Distribuidor){

    this.distribuidorUpdate = distribuidor;

      this.distribuidorForm.reset({
        nombre: distribuidor.nombre,
        correoNotificacion: distribuidor.correoNotificacion,
        correoAlerta: distribuidor.correoAlertas
      })
  
  }

  cargarDistribuidor(){

    if(!environment.production || !environmentProd.production){
      this.distribuidor = this.service.distribuidor;
      
      if(!localStorage.getItem('codigoD')){
        localStorage.setItem('codigoD', '0');
      }
    }else{
      this.serviceD.getAll().subscribe( data => this.distribuidor = data );
    }

  }

  cancelar(){
    this.distribuidorForm.reset();
    this.distribuidorUpdate = null;
  }

}
