import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { getISOWeek } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-tabla-simple',
  templateUrl: './tabla-simple.component.html',
  styleUrls: ['./tabla-simple.component.scss']
})
export class TablaSimpleComponent implements OnInit, OnChanges {

  searchValue = '';
  visible = false;
  @Input() isTemporada=false;
  @Input() loading=false;
  @Input() data: [] = [];
  @Input() labels: {label: String, value: String}[] = [];
  @Input() view: (arg:any) => void;
  @Input() remove: (arg:any) => void;
  @Input() update: (arg:any) => void;
  dataVisible = [...this.data];

  constructor(private modal: NzModalService) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.data.currentValue) this.data=changes.data.currentValue as [];
    if(this.data != null){
      this.dataVisible = [...this.data];
    }
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.dataVisible = this.data.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  showDeleteConfirm(id: number){
    this.modal.confirm({
      nzTitle: 'Advertencia',
      nzContent: '¿Desea eliminar este producto? <b style="color: red;"></b>',
      nzOkText: 'Si',
      nzOkType: 'primary',
      /* nzOkDanger: true, */
      nzOnOk: () => this.remove(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  showUpdateConfirm(data: Object){
    this.modal.confirm({
      nzTitle: 'Advertencia',
      nzContent: '¿Desea editar este producto? <b style="color: red;"></b>',
      nzOkText: 'Si',
      nzOkType: 'primary',
      /* nzOkDanger: true, */
      nzOnOk: () => this.update(data),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

}
