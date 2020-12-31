import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { ServiceLocalProductoService } from '../../services-local/service-local-producto.service';
import { Distribuidor } from '../../models/distribuidor.model';
import { ProductoServiceService } from '../../services-rest/producto-service.service';
import { DistribuidorServiceService } from '../../services-rest/distribuidor-service.service';
import { environment } from '../../../environments/environment';
import { environment as environmentProd } from '../../../environments/environment.prod';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productoForm: FormGroup;
  producto: Producto[] = [];
  distribuidores: Distribuidor[];
  productoUpdate: Producto;

  constructor(private fb: FormBuilder, private service: ServiceLocalProductoService, private serviceP: ProductoServiceService, private serviceD: DistribuidorServiceService) {
    this.crearFormulario();
    this.cargarProductos();

   }

  ngOnInit(): void {
  }

  get descripcionNoValida(){
    return this.productoForm.get('descripcion').invalid && this.productoForm.get('descripcion').touched
  }

  get montoNoValido(){
    return this.productoForm.get('monto').invalid && this.productoForm.get('monto').touched
  }

  get distribuidorNoValido(){
    return this.productoForm.get('distribuidorControl').invalid && this.productoForm.get('distribuidorControl').touched
  }


  crearFormulario(){
    this.productoForm = this.fb.group({
      descripcion: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      distribuidorControl: ['', [Validators.required]]
    })
  }

  guardar(){

    if(this.productoForm.invalid){
      Object.values( this.productoForm.controls ).forEach( control => {
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
      if(Number(this.productoForm.value.distribuidorControl)){
        const codigo = Number(localStorage.getItem('codigoP')) + 1;
        localStorage.setItem('codigoP', codigo.toString());
        const descripcion = this.productoForm.value.descripcion;
        const monto = this.productoForm.value.monto;
        const distribuidorCodigo = Number(this.productoForm.value.distribuidorControl);
        
        this.service.crearProducto(codigo, descripcion, monto, distribuidorCodigo);
        this.productoForm.reset();
      }else{
        return;
      }
    }else{
      const descripcion = this.productoForm.value.descripcion;
      const monto = this.productoForm.value.monto;
      const distribuidorCodigo = Number(this.productoForm.value.distribuidorControl);
      const producto: Producto = { descripcion, monto, distribuidorCodigo };
  
      this.serviceP.saveP(producto).subscribe( data => this.cargarProductos() );
      this.productoForm.reset();

    }

    
  }

  editar(){

    this.productoUpdate.descripcion = this.productoForm.value.descripcion;
    this.productoUpdate.monto = this.productoForm.value.monto;
    this.productoUpdate.distribuidorCodigo = this.productoForm.value.distribuidorControl;

    if(!environment.production || !environmentProd.production){
      this.service.producto.map( data => data.codigo === this.productoUpdate.codigo ? this.productoUpdate : data );
      this.service.guardarStorage();
      this.productoForm.reset();
      this.productoUpdate = null;
    }else{
      
        this.serviceP.editP(this.productoUpdate.codigo, this.productoUpdate).subscribe( data => this.cargarProductos());
    
        this.productoForm.reset();
        this.productoUpdate = null;
    }

  }


  editarProducto(producto: Producto){

    this.productoUpdate = producto;
    
    this.productoForm.reset({
      descripcion: producto.descripcion,
      monto: producto.monto,
      distribuidorControl: producto.distribuidorCodigo
    })

  }

  cargarProductos(){
    
    if(!environment.production || !environmentProd.production){
      this.producto = this.service.producto;
      this.distribuidores = JSON.parse(localStorage.getItem('distribuidores'));
      
      if(!localStorage.getItem('codigoP')){
        localStorage.setItem('codigoP', '0');
      }
    }else{
      this.serviceP.getAll().subscribe( data => this.producto = data );
      this.serviceD.getAll().subscribe( data => { this.distribuidores = data });
    }


  }

}
