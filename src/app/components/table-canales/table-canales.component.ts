import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Canal } from '../../models/canal.model';
import { ServiceLocalCanalService } from '../../services-local/service-local-canal.service';
import { environment } from '../../../environments/environment';
import { environment as environmentProd } from '../../../environments/environment.prod';
import { CanalServiceService } from '../../services-rest/canal-service.service';

@Component({
  selector: 'app-table-canales',
  templateUrl: './table-canales.component.html',
  styleUrls: ['./table-canales.component.css']
})
export class TableCanalesComponent implements OnInit {

  @Input() canales: Canal[];

  @Output() codigoSeleccionado: EventEmitter<Canal>;

  constructor(private service: ServiceLocalCanalService, private serviceRest: CanalServiceService) {
    this.codigoSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {
  }


  borrar(codigo: number | string){

    if(!environment.production || !environmentProd.production){
      this.canales = this.service.eliminarCanal(codigo);
    }else{
      this.serviceRest.removeC(codigo).subscribe( data => {
        this.cargarCanal();
      })
    }


  }

  cargarCanal(){
   this.serviceRest.getAll().subscribe( data  => this.canales = data)
  }

  editar(canal: Canal){
    this.codigoSeleccionado.emit(canal);
  }


}
