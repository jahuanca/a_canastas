import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareosSapComponent } from './tareos-sap.component';

const routes: Routes = [{ path: '', component: TareosSapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareosSapRoutingModule { }
