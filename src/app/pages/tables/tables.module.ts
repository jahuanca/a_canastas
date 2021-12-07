import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaSimpleComponent } from './tabla-simple/tabla-simple.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ActionsModule } from '../actions/actions.module';



@NgModule({
  declarations: [TablaSimpleComponent],
  exports: [TablaSimpleComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ActionsModule,
  ]
})
export class TablesModule { }
