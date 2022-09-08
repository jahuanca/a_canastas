import { NgModule } from '@angular/core';
import { FormsModule  as F} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormSimpleComponent } from './form-simple/form-simple.component';
import { NzDatePickerModule, NzFormModule, NzModalModule, NzSelectModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormSimpleComponent],
  imports: [
    CommonModule,
    NzFormModule,
    NzModalModule,
    ReactiveFormsModule,
    F,
    NzSelectModule,
    NzDatePickerModule,
  ],
  exports: [FormSimpleComponent],
})
export class FormsModule { }
