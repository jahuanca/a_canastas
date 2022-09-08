import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncuestasRoutingModule } from './encuestas-routing.module';
import { EncuestasComponent } from './encuestas.component';
import { CardsModule } from 'src/app/pages/cards/cards.module';
import { TablesModule } from 'src/app/pages/tables/tables.module';
import { FormsModule } from 'src/app/pages/forms/forms.module';


@NgModule({
  declarations: [EncuestasComponent],
  imports: [
    CommonModule,
    EncuestasRoutingModule,
    TablesModule,
    CardsModule,
    FormsModule,
  ]
})
export class EncuestasModule { }
