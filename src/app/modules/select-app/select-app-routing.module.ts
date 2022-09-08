import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectAppComponent } from './select-app.component';

const routes: Routes = [{ path: '', component: SelectAppComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectAppRoutingModule { }
