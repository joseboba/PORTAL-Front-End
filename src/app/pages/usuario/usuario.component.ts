import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { ServiceLocalUsuarioService } from '../../services-local/service-local-usuario.service';
import { Distribuidor } from '../../models/distribuidor.model';
import { UsuarioServiceService } from '../../services-rest/usuario-service.service';
import { DistribuidorServiceService } from '../../services-rest/distribuidor-service.service';
import { environment } from '../../../environments/environment';
import { environment as environmentProd } from '../../../environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  usuario: Usuario[] = [];
  distribuidores: Distribuidor[] = [];
  usuarioUpdate: Usuario;

  constructor(private fb: FormBuilder, private service: ServiceLocalUsuarioService, private serviceU: UsuarioServiceService, private serviceD: DistribuidorServiceService) { 
    this.crearFormulario();
    this.cargarUsuarios();
    
  }

  ngOnInit(): void {
  }

  get nombreNoValido(){
    return this.usuarioForm.get('nombre').invalid && this.usuarioForm.get('nombre').touched
  }

  get correoNoValido(){
    return this.usuarioForm.get('correo').invalid && this.usuarioForm.get('correo').touched
  }

  get telefonoNoValido(){
    return this.usuarioForm.get('telefono').invalid && this.usuarioForm.get('telefono').touched
  }

  get distribuidorNoValido(){
    return this.usuarioForm.get('distribuidorControl').invalid && this.usuarioForm.get('distribuidorControl').touched
  }

  crearFormulario(){
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      distribuidorControl: ['', Validators.required]
    })
  }

  guardar(){
    if(this.usuarioForm.invalid){
      Object.values( this.usuarioForm.controls ).forEach( control => {
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
      if(Number(this.usuarioForm.value.distribuidorControl)){
        const codigo = Number(localStorage.getItem('codigoU')) + 1;
        localStorage.setItem('codigoU', codigo.toString());
        
        const correo = this.usuarioForm.value.correo;
        const nombre = this.usuarioForm.value.nombre;
        const telefono = this.usuarioForm.value.telefono;
        const distribuidorControl =  Number(this.usuarioForm.value.distribuidorControl);
  
        this.service.crearUsuario(codigo, nombre, correo, telefono, distribuidorControl);
        this.usuarioForm.reset();
  
      }else{
        return;
      }
    }else{
      const correo = this.usuarioForm.value.correo.toString().trim();
      const nombre = this.usuarioForm.value.nombre.toString().trim();
      const telefono = this.usuarioForm.value.telefono.toString().trim();
      const distribuidorCodigo =  Number(this.usuarioForm.value.distribuidorControl.toString().trim());
      const usuario: Usuario = { correo, nombre, telefono, distribuidorCodigo };
  
      this.serviceU.saveU(usuario).subscribe( (data:any) => {
          if(!data.ok){
          Swal.fire({
            title: 'Error',
            text: data.msg,
            icon: 'error'
          })
          this.cargarUsuarios();
        }else{
          this.cargarUsuarios()
          this.usuarioForm.reset();
        }
      })
    }

  }


  editar(){

    this.usuarioUpdate.nombre = this.usuarioForm.value.nombre.toString().trim();
    this.usuarioUpdate.correo = this.usuarioForm.value.correo.toString().trim();
    this.usuarioUpdate.telefono = this.usuarioForm.value.telefono.toString().trim();
    this.usuarioUpdate.distribuidorCodigo = this.usuarioForm.value.distribuidorControl;
    
    if(!environment.production || !environmentProd.production){
      this.service.usuario.map( data => data.codigo === this.usuarioUpdate.codigo ? this.usuarioUpdate : data );
      this.service.guardarStorage();
      this.usuarioForm.reset();
      this.usuarioUpdate = null;
    }else{
      this.serviceU.editU(this.usuarioUpdate.codigo, this.usuarioUpdate).subscribe( (data:any) => {
       
        if(!data.ok){
          Swal.fire({
            title: 'Error',
            text: data.msg,
            icon: 'error'
          })
          this.cargarUsuarios();
        }else{
          this.cargarUsuarios()
        }

      })
      this.usuarioForm.reset();
      this.usuarioUpdate = null;
    }

  }


  editarUsuario(usuario: Usuario){

    this.usuarioUpdate = usuario;

    this.usuarioForm.reset({
      nombre: usuario.nombre,
      correo: usuario.correo,
      telefono: usuario.telefono,
      distribuidorControl: usuario.distribuidorCodigo
    })

  }

  cargarUsuarios(){

    if(!environment.production || !environmentProd.production){
      this.usuario = this.service.usuario;
      this.distribuidores = JSON.parse(localStorage.getItem('distribuidores'));
  
      if(!localStorage.getItem('codigoU')){
        localStorage.setItem('codigoU', '0');
      }
    }else{
      this.serviceU.getAll().subscribe( data => this.usuario = data);
      this.serviceD.getAll().subscribe( data => this.distribuidores = data );
    }
  }


  cancelar(){
    this.usuarioUpdate = null;
    this.usuarioForm.reset();
  }

}
