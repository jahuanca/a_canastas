import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-card-buttons',
  templateUrl: './card-buttons.component.html',
  styleUrls: ['./card-buttons.component.scss']
})
export class CardButtonsComponent implements OnInit, OnChanges {

  @Input() buscar: () => void;
  @Input() agregar: () => void;
  @Input() data: [] = [];
  @Input() label: String;
  downloadJsonHref;

  constructor(private sanitizer: DomSanitizer, private excelService:ExcelService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //if(changes.data.currentValue != undefined)     this.data=changes.data.currentValue;
    //if(changes.agregar.currentValue != undefined)  this.agregar=changes.agregar.currentValue;
    this.generateDownloadJsonUri();
  }

  exportarExcel(){
    this.excelService.exportAsExcelFile(this.data, this.label.toString());
  }

  generateDownloadJsonUri() {
    var theJSON = JSON.stringify(this.data);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }


}