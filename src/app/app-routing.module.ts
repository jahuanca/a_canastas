import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { UnAuthGuard } from './guards/un-auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/personal-vehiculo' },
  { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuardGuard] },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule), canActivate: [UnAuthGuard]},
  { path: '**', loadChildren: () => import('./modules/error404/error404.module').then(m => m.Error404Module) },
  /* { path: 'actividades', loadChildren: () => import('./modules/actividades/actividades.module').then(m => m.ActividadesModule) },
  { path: 'labores', loadChildren: () => import('./modules/labores/labores.module').then(m => m.LaboresModule) },
  { path: 'subdivisiones', loadChildren: () => import('./modules/subdivisiones/subdivisiones.module').then(m => m.SubdivisionesModule) },
  { path: 'productos', loadChildren: () => import('./modules/productos/productos.module').then(m => m.ProductosModule) },
  { path: 'vehiculos', loadChildren: () => import('./modules/vehiculos/vehiculos.module').then(m => m.VehiculosModule) },
  { path: 'temporadas', loadChildren: () => import('./modules/temporadas/temporadas.module').then(m => m.TemporadasModule) },
  { path: 'PuntoEntrega', loadChildren: () => import('./modules/punto-entrega/punto-entrega.module').then(m => m.PuntoEntregaModule) },
  { path: 'PersonalVehiculo', loadChildren: () => import('./modules/personal-vehiculo/personal-vehiculo.module').then(m => m.PersonalVehiculoModule) }, */
  /* { path: 'tareos-sap', loadChildren: () => import('./modules/tareos-sap/tareos-sap.module').then(m => m.TareosSapModule) }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
