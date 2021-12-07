import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboresRoutingModule } from './labores-routing.module';
import { LaboresComponent } from './labores.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TablesModule } from 'src/app/pages/tables/tables.module';
import { CardsModule } from 'src/app/pages/cards/cards.module';


@NgModule({
  declarations: [LaboresComponent],
  imports: [
    CommonModule,
    LaboresRoutingModule,
    TablesModule,
    CardsModule,
  ]
})
export class LaboresModule { }
