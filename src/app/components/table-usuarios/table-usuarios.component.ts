import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { ServiceLocalUsuarioService } from '../../services-local/service-local-usuario.service';
import { UsuarioServiceService } from '../../services-rest/usuario-service.service';
import { environment } from '../../../environments/environment';
import { environment as environmentProd } from '../../../environments/environment.prod';

@Component({
  selector: 'app-table-usuarios',
  templateUrl: './table-usuarios.component.html',
  styleUrls: ['./table-usuarios.component.css']
})
export class TableUsuariosComponent implements OnInit {

  @Input() usuarios: Usuario[];

  @Output() codigoSeleccionado: EventEmitter<Usuario>;

  constructor(private service: ServiceLocalUsuarioService, private serviceU: UsuarioServiceService) { 
  
    this.codigoSeleccionado = new EventEmitter();

  }

  ngOnInit(): void {
  }

  borrar(codigo: number | string){
    if(!environment || !environmentProd.production){
      this.usuarios =  this.service.eliminarUsuario(codigo);
    }else{
      this.serviceU.removeU(codigo).subscribe(data => this.cargar());
    }


  }


  editar(usuario: Usuario){
    this.codigoSeleccionado.emit(usuario);
  }

  cargar(){
    this.serviceU.getAll().subscribe( data => this.usuarios = data );
  }

}
