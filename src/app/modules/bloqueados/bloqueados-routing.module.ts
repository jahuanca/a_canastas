import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BloqueadosComponent } from './bloqueados.component';

const routes: Routes = [{ path: '', component: BloqueadosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloqueadosRoutingModule { }
