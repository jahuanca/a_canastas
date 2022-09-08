import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemporadasComponent } from './temporadas.component';

const routes: Routes = [{ path: '', component: TemporadasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemporadasRoutingModule { }
