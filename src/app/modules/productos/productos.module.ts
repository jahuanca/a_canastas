import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { TablesModule } from 'src/app/pages/tables/tables.module';
import { CardsModule } from 'src/app/pages/cards/cards.module';
import { NzModalModule } from 'ng-zorro-antd';
import { FormsModule } from 'src/app/pages/forms/forms.module';


@NgModule({
  declarations: [ProductosComponent],
  imports: [
    CommonModule,
    TablesModule,
    CardsModule,
    NzModalModule,
    FormsModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
