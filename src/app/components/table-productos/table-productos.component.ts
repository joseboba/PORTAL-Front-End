import { identifierModuleUrl } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ServiceLocalProductoService } from '../../services-local/service-local-producto.service';
import { ProductoServiceService } from '../../services-rest/producto-service.service';
import { environment } from '../../../environments/environment';
import { environment as environmentProd } from '../../../environments/environment.prod';

@Component({
  selector: 'app-table-productos',
  templateUrl: './table-productos.component.html',
  styleUrls: ['./table-productos.component.css']
})
export class TableProductosComponent implements OnInit {

  @Input() productos: Producto[];

  @Output() codigoSeleccionado: EventEmitter<Producto>;

  constructor(private service: ServiceLocalProductoService, private serviced: ProductoServiceService) { 
    this.codigoSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {
  }

  borrar(codigo: number | string){

    if(!environment.production || !environmentProd.production){
      this.productos = this.service.eliminarProducto(codigo);
    }else{
      this.serviced.removeP(codigo).subscribe( data => this.cargar());
    }


  }

  editar(producto: Producto){
    this.codigoSeleccionado.emit(producto);
  }

  cargar(){
    this.serviced.getAll().subscribe(data => this.productos = data);
  }

}
