import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      /* { path: '', loadChildren: () => import('./../home/home.module').then(m => m.HomeModule) }, */
      { path: 'personal-vehiculo', loadChildren: () => import('./../personal-vehiculo/personal-vehiculo.module').then(m => m.PersonalVehiculoModule)},
      { path: 'respuestas-personal', loadChildren: () => import('./../respuestas-personal/respuestas-personal.module').then(m => m.RegistrosPersonalModule)},
      
      { path: 'encuestas', loadChildren: () => import('./../encuestas/encuestas.module').then(m => m.EncuestasModule) },
      { path: 'bloqueados', loadChildren: () => import('./../bloqueados/bloqueados.module').then(m => m.BloqueadosModule) },
      { path: 'productos', loadChildren: () => import('./../productos/productos.module').then(m => m.ProductosModule) },
      { path: 'vehiculos', loadChildren: () => import('./../vehiculos/vehiculos.module').then(m => m.VehiculosModule) },
      { path: 'temporadas', loadChildren: () => import('./../temporadas/temporadas.module').then(m => m.TemporadasModule) },
      { path: 'puntos-entrega', loadChildren: () => import('./../punto-entrega/punto-entrega.module').then(m => m.PuntoEntregaModule) },
      { path: 'sincronizacion-actividad', loadChildren: () => import('./../actividades/actividades.module').then(m => m.ActividadesModule) },
      { path: 'sincronizacion-labor', loadChildren: () => import('./../labores/labores.module').then(m => m.LaboresModule) },
      { path: 'sincronizacion-subdivision', loadChildren: () => import('./../subdivisiones/subdivisiones.module').then(m => m.SubdivisionesModule) },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
