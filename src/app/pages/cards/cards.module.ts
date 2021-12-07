import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardButtonsComponent } from './card-buttons/card-buttons.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';



@NgModule({
  declarations: [CardButtonsComponent],
  exports: [CardButtonsComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    
  ]
})
export class CardsModule { }
