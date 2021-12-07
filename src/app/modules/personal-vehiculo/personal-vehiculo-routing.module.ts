import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalVehiculoComponent } from './personal-vehiculo.component';

const routes: Routes = [{ path: '', component: PersonalVehiculoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalVehiculoRoutingModule { }
