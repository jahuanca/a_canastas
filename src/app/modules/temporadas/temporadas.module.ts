import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemporadasRoutingModule } from './temporadas-routing.module';
import { TemporadasComponent } from './temporadas.component';
import { CardsModule } from 'src/app/pages/cards/cards.module';
import { TablesModule } from 'src/app/pages/tables/tables.module';
import { FormsModule } from 'src/app/pages/forms/forms.module';


@NgModule({
  declarations: [TemporadasComponent],
  imports: [
    CommonModule,
    TemporadasRoutingModule,
    TablesModule,
    CardsModule,
    FormsModule,
  ]
})
export class TemporadasModule { }
