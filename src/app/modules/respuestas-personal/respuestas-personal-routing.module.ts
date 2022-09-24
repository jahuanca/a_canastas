import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespuestasPersonalComponent } from './respuestas-personal.component';

const routes: Routes = [{ path: '', component: RespuestasPersonalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrosPersonalRoutingModule { }