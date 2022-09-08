import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubdivisionesComponent } from './subdivisiones.component';

const routes: Routes = [{ path: '', component: SubdivisionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubdivisionesRoutingModule { }
