import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloqueadosRoutingModule } from './bloqueados-routing.module';
import { BloqueadosComponent } from './bloqueados.component';
import { CardsModule } from 'src/app/pages/cards/cards.module';
import { TablesModule } from 'src/app/pages/tables/tables.module';


@NgModule({
  declarations: [BloqueadosComponent],
  imports: [
    CommonModule,
    BloqueadosRoutingModule,
    CardsModule,
    TablesModule,
  ],
})
export class BloqueadosModule { }
