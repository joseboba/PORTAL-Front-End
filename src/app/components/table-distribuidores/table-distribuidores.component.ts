import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Distribuidor } from '../../models/distribuidor.model';
import { ServiceLocalDistribuidorService } from '../../services-local/service-local-distribuidor.service';
import { environment } from '../../../environments/environment';
import { DistribuidorServiceService } from '../../services-rest/distribuidor-service.service';
import { environment as environmentProd } from '../../../environments/environment.prod';


@Component({
  selector: 'app-table-distribuidores',
  templateUrl: './table-distribuidores.component.html',
  styleUrls: ['./table-distribuidores.component.css']
})
export class TableDistribuidoresComponent implements OnInit {

  @Input() distriubidores: Distribuidor[];

  @Output() codigoSeleccionado: EventEmitter<Distribuidor>;

  constructor(private service: ServiceLocalDistribuidorService, private serviceD: DistribuidorServiceService) {
    this.codigoSeleccionado = new EventEmitter();
   }

  ngOnInit(): void {
  }

  borrar(codigo: number | string){

    if(!environment.production || !environmentProd.production){
      this.distriubidores = this.service.eliminarDistribuidor(codigo);
    }else{
      this.serviceD.removeD(codigo).subscribe( data => this.cargarDistribuidor() );
    }


  }

  editar(distribuidor: Distribuidor){
    this.codigoSeleccionado.emit(distribuidor);
  }

  cargarDistribuidor(){
    this.serviceD.getAll().subscribe( data => this.distriubidores = data );
  }

}
