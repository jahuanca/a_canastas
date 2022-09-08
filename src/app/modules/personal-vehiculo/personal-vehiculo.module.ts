import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalVehiculoRoutingModule } from './personal-vehiculo-routing.module';
import { PersonalVehiculoComponent } from './personal-vehiculo.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [PersonalVehiculoComponent],
  imports: [
    CommonModule,
    PersonalVehiculoRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class PersonalVehiculoModule { }
