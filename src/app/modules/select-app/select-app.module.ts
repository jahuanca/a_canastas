import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectAppRoutingModule } from './select-app-routing.module';
import { SelectAppComponent } from './select-app.component';


@NgModule({
  declarations: [SelectAppComponent],
  imports: [
    CommonModule,
    SelectAppRoutingModule
  ]
})
export class SelectAppModule { }
