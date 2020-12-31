import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDistribuidoresComponent } from './table-distribuidores/table-distribuidores.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagesModule } from '../pages/pages.module';
import { AppRoutingModule } from '../app-routing.module';
import { TableHorariosComponent } from './table-horarios/table-horarios.component';
import { TableUsuariosComponent } from './table-usuarios/table-usuarios.component';
import { TableProductosComponent } from './table-productos/table-productos.component';
import { TableCanalesComponent } from './table-canales/table-canales.component';
import { CardsComponent } from './cards/cards.component';



@NgModule({
  declarations: [
    TableDistribuidoresComponent,
    TableHorariosComponent,
    TableUsuariosComponent,
    TableProductosComponent,
    TableCanalesComponent,
    NavbarComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    TableDistribuidoresComponent,
    TableHorariosComponent,
    TableUsuariosComponent,
    TableProductosComponent,
    TableCanalesComponent,
    CardsComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }
