import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuntoEntregaRoutingModule } from './punto-entrega-routing.module';
import { PuntoEntregaComponent } from './punto-entrega.component';
import { FormsModule } from 'src/app/pages/forms/forms.module';
import { TablesModule } from 'src/app/pages/tables/tables.module';
import { CardsModule } from 'src/app/pages/cards/cards.module';


@NgModule({
  declarations: [PuntoEntregaComponent],
  imports: [
    CommonModule,
    PuntoEntregaRoutingModule,
    FormsModule,
    TablesModule,
    CardsModule,
  ]
})
export class PuntoEntregaModule { }
