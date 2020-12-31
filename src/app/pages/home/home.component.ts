import { Component, OnInit } from '@angular/core';
import { options } from 'src/assets/search-options';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchService } from '../../services-local/service-local-search.service';
import { environment as environmentProd } from '../../../environments/environment.prod';
import { environment } from '../../../environments/environment'
import { SearchServiceService } from '../../services-rest/search-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup;
  optionsComponent: string[] = options;
  result: any [] = [];

  constructor(private fb: FormBuilder, private service: SearchService, private serviceS: SearchServiceService) {
    this.crearFormulario(); 
  }

  ngOnInit(): void {
  }

  get searchNoValido(){
    return this.searchForm.get('search').invalid && this.searchForm.get('search').touched
  }

  get optionNoValido(){
    return this.searchForm.get('option').invalid && this.searchForm.get('option').touched
  }

  get option(){
    return this.searchForm.get('option').value
  }

  crearFormulario(){
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]],
      option: ['', [Validators.required]]
    })
  }


  search(){

    if(this.searchForm.invalid){
      Object.values( this.searchForm.controls ).forEach( control => {
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

    console.log(this.searchForm.value)

    const option = this.searchForm.value.option;
    const search = this.searchForm.value.search;


    if(option === 'Canales'){
      if(!environment.production || !environmentProd.production) {
        this.result = this.service.buscarCanal(search);
      }else{
        this.serviceS.getC(search).subscribe( (data:any) => {
          if(!data.ok){

            Swal.fire({
              title: 'Error',
              text: data.msg,
              icon: 'error'
            })

          }else{
            this.result = data.canal;
          }
        });
      }
    }

    if(option === 'Distribuidores'){
      if(!environment.production || !environmentProd.production) {
        this.result = this.service.buscarDistribuidor(search);
      }else{
        this.serviceS.getD(search).subscribe( (data:any) => {
          if(!data.ok){

            Swal.fire({
              title: 'Error',
              text: data.msg,
              icon: 'error'
            })

          }else{
            this.result = data.distribuidor;
          }
        });
      }
    }

    if(option === 'Horarios'){
      if(!environment.production || !environmentProd.production) {
        this.result = this.service.buscarHorario(search);
      }else{
        this.serviceS.getH(search).subscribe( (data:any) => {
          if(!data.ok){

            Swal.fire({
              title: 'Error',
              text: data.msg,
              icon: 'error'
            })

          }else{
            this.result = data.horario;
          }
        });
      }
    }

    if(option === 'Productos'){
      if(!environment.production || !environmentProd.production) {
        this.result = this.service.buscarUsuario(search);
      }else{
        this.serviceS.getP(search).subscribe( (data:any) => {
          if(!data.ok){

            Swal.fire({
              title: 'Error',
              text: data.msg,
              icon: 'error'
            })

          }else{
            this.result = data.producto;
          }
        });
      }
    }

    if(option === 'Usuarios'){
      if(!environment.production || !environmentProd.production) {
        this.result = this.service.buscarUsuario(search);
      }else{
        this.serviceS.getU(search).subscribe( (data:any) => {
          if(!data.ok){

            Swal.fire({
              title: 'Error',
              text: data.msg,
              icon: 'error'
            })

          }else{
            this.result = data.usuario
            console.log(data)
          }
        });
      }
    }
  

  }

}
