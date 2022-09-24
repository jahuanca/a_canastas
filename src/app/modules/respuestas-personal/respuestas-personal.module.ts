import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrosPersonalRoutingModule } from './respuestas-personal-routing.module';
import { RespuestasPersonalComponent } from './respuestas-personal.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [RespuestasPersonalComponent],
  imports: [
    CommonModule,
    RegistrosPersonalRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class RegistrosPersonalModule { }