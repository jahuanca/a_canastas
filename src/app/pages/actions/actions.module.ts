import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElegirComponent } from './elegir/elegir.component';
import { NzAffixModule, NzDrawerModule, NzModalModule, NzSpinModule, NzTableModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ElegirComponent],
  imports: [
    CommonModule,
    NzModalModule,
    NzTableModule,
    NzDrawerModule,
    FormsModule,
    NzAffixModule,
    NzSpinModule,
  ],
  exports: [ElegirComponent]
})
export class ActionsModule { }
