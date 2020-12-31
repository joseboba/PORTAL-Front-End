import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanalesComponent } from './canales/canales.component';
import { DistribuidorComponent } from './distribuidor/distribuidor.component';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ComponentsModule } from '../components/components.module';
import { HorarioComponent } from './horario/horario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule, NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';



@NgModule({
  declarations: [
    CanalesComponent,
    DistribuidorComponent,
    HomeComponent,
    ProductoComponent,
    UsuarioComponent,
    HorarioComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
  ],
  exports:[
    CanalesComponent,
    DistribuidorComponent,
    HomeComponent,
    ProductoComponent,
    UsuarioComponent,
    HorarioComponent,
    NgxMaterialTimepickerComponent
  ]
})
export class PagesModule { }
