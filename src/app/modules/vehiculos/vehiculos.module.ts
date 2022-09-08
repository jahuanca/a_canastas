import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosRoutingModule } from './vehiculos-routing.module';
import { VehiculosComponent } from './vehiculos.component';
import { CardsModule } from 'src/app/pages/cards/cards.module';
import { TablesModule } from 'src/app/pages/tables/tables.module';
import { FormsModule } from 'src/app/pages/forms/forms.module';


@NgModule({
  declarations: [VehiculosComponent],
  imports: [
    CommonModule,
    VehiculosRoutingModule,
    TablesModule,
    CardsModule,
    FormsModule,
  ]
})
export class VehiculosModule { }
