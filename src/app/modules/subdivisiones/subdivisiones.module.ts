import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubdivisionesRoutingModule } from './subdivisiones-routing.module';
import { SubdivisionesComponent } from './subdivisiones.component';
import { TablesModule } from 'src/app/pages/tables/tables.module';
import { CardsModule } from 'src/app/pages/cards/cards.module';


@NgModule({
  declarations: [SubdivisionesComponent],
  imports: [
    CommonModule,
    SubdivisionesRoutingModule,
    TablesModule,
    CardsModule,
  ]
})
export class SubdivisionesModule { }
