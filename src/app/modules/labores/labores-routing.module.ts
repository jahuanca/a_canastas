import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaboresComponent } from './labores.component';

const routes: Routes = [{ path: '', component: LaboresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboresRoutingModule { }
