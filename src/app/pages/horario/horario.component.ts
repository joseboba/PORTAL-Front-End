import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import 'moment/locale/es'
import { ServiceLocalHorarioService } from '../../services-local/service-local-horario.service';
import { Horario } from '../../models/horario.model';
import { Distribuidor } from '../../models/distribuidor.model';
import { HorarioServiceService } from '../../services-rest/horario-service.service';
import { environment } from '../../../environments/environment';
import { DistribuidorServiceService } from '../../services-rest/distribuidor-service.service';
import { environment as environmentProd } from '../../../environments/environment.prod';
import { HorarioResponse } from '../../interfaces/horario-interface';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  horarioForm: FormGroup;
  horario: Horario[] = [];
  horarioUpdate: Horario;

  distribuidores: Distribuidor[];

  hourNow = moment().format('LT');

  constructor(private fb: FormBuilder, private service: ServiceLocalHorarioService, private serviceH: HorarioServiceService, private serviceD: DistribuidorServiceService) {
    this.crearFormulario();
    this.cargarHorario();
   }

  get horarioStartNoValido(){
    return this.horarioForm.get('start').invalid && this.horarioForm.get('start').touched
  }

  get horarioEndNoValido(){
    return this.horarioForm.get('end').invalid && this.horarioForm.get('end').touched
  }

  get horarioEndMin(){
    return this.horarioForm.value.start;
  }

  get horarioStartMin(){
    return this.horarioForm.value.start || moment().subtract(1, 'hour').format('LT').toString();;
  }


  get distribuidorNoValido(){
    return this.horarioForm.get('distribuidorControl').invalid && this.horarioForm.get('distribuidorControl').touched 
  }

  
 

  ngOnInit(): void {
  }

  crearFormulario(){
    this.horarioForm = this.fb.group({
      start: ['', [Validators.required]],
      end:['', [Validators.required]],
      distribuidorControl: ['', [Validators.required]]
    })
  }


  guardar(){

    if(this.horarioForm.invalid){
      Object.values( this.horarioForm.controls ).forEach( control => {
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
      if(Number(this.horarioForm.value.distribuidorControl)){
        const codigo = Number(localStorage.getItem('codigoH')) + 1;
        localStorage.setItem('codigoH', codigo.toString());
        const start = this.horarioForm.value.start;
        const end = this.horarioForm.value.end;
        const distribuidorCodigo = Number(this.horarioForm.value.distribuidorControl);
        
        this.service.crearhorario(codigo, start, end, distribuidorCodigo);
        this.horarioForm.reset();
      }else{
        return;
      }
    }else{
      const start = this.horarioForm.value.start
      const end = this.horarioForm.value.end
      const distribuidorCodigo = Number(this.horarioForm.value.distribuidorControl);
  
      const horario: Horario = { start, end, distribuidorCodigo }
      this.serviceH.saveH(horario).subscribe( data => this.cargarHorario());
      this.horarioForm.reset();
    }


  }

  editar(){

    this.horarioUpdate.start = this.horarioForm.value.start;
    this.horarioUpdate.end = this.horarioForm.value.end;
    this.horarioUpdate.distribuidorCodigo = this.horarioForm.value.distribuidorControl;

    if(!environment.production ||  !environmentProd.production){
      this.service.horario.map( resp => resp.codigo === this.horarioUpdate.codigo ? this.horarioUpdate : resp );
      this.service.guardarStorage();
      this.horarioForm.reset();
      this.horarioForm = null;
    }else{
      this.serviceH.editH(this.horarioUpdate.codigo, this.horarioUpdate).subscribe( data => this.cargarHorario())
      this.horarioForm.reset();
      this.horarioForm = null;
    }


  }

  editarHorario(horario: Horario){
    
    this.horarioUpdate = horario;
    
    this.horarioForm.reset({
      start: horario.start,
      end: horario.end,
      distribuidorControl: horario.distribuidorCodigo
    })

  }

  cargarHorario(){
    
    if(!environment.production ||  !environmentProd.production){
      this.horario = this.service.horario;
      this.distribuidores = JSON.parse(localStorage.getItem('distribuidores'));

      if(!localStorage.getItem('codigoH')){
        localStorage.setItem('codigoH', '0');
      }
    }else{
      this.serviceH.getAll().subscribe( data => this.horario = data );
      this.serviceD.getAll().subscribe( data => this.distribuidores = data);
    }


  }

  cancelar(){
    this.horarioUpdate = null;
    this.horarioForm.reset();
  }

}
