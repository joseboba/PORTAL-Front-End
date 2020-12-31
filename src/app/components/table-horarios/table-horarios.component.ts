import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Horario } from '../../models/horario.model';
import { ServiceLocalHorarioService } from '../../services-local/service-local-horario.service';
import { HorarioServiceService } from '../../services-rest/horario-service.service';
import { environment } from '../../../environments/environment';
import { environment as environmentProd } from '../../../environments/environment.prod';

@Component({
  selector: 'app-table-horarios',
  templateUrl: './table-horarios.component.html',
  styleUrls: ['./table-horarios.component.css']
})
export class TableHorariosComponent implements OnInit {

  @Input() horarios: Horario[] = [];

  @Output() codigoSeleccionado: EventEmitter<Horario>;

  constructor(private service: ServiceLocalHorarioService, private serviceH: HorarioServiceService) { 
    this.codigoSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {
  }

  eliminar(codigo: number){

    if(!environment.production || !environmentProd.production){
      this.horarios = this.service.eliminarhorario(codigo);
    }else{
      this.serviceH.removeDH(codigo).subscribe( data => this.cargar() );
    }


  }

  editar(horario: Horario){
    this.codigoSeleccionado.emit(horario);
  }

  cargar(){
    this.serviceH.getAll().subscribe( data => this.horarios = data )
  }

}
