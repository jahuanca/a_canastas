import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElegirComponent } from './elegir/elegir.component';
import { NzAffixModule, NzDatePickerModule, NzDrawerModule, NzFormModule, NzModalModule, NzSelectModule, NzSpinModule, NzTableModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { FormsModule  as F} from '@angular/forms';
import { FormsModule } from '../forms/forms.module';



@NgModule({
  declarations: [ElegirComponent, EncuestaComponent],
  imports: [
    CommonModule,
    NzModalModule,
    NzTableModule,
    NzDrawerModule,
    FormsModule,
    NzAffixModule,
    NzSpinModule,
    NzFormModule,
    ReactiveFormsModule,
    F,
    NzSelectModule,
    NzDatePickerModule,
  ],
  exports: [ElegirComponent, EncuestaComponent]
})
export class ActionsModule { }
