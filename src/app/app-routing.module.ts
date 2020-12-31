import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistribuidorComponent } from './pages/distribuidor/distribuidor.component';
import { HomeComponent } from './pages/home/home.component';
import { CanalesComponent } from './pages/canales/canales.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { HorarioComponent } from './pages/horario/horario.component';

const routes: Routes = [
  { path: 'distribuidor', component: DistribuidorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'canal', component: CanalesComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'horario', component: HorarioComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
