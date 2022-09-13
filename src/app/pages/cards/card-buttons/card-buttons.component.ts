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
  @Input() data: any;
  @Input() label: String;
  downloadJsonHref;

  constructor(private sanitizer: DomSanitizer, private excelService:ExcelService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateDownloadJsonUri();
  }

  exportarExcel(){
    this.excelService.exportAsExcelFile(this.data, this.label.toString());
  }

  generateDownloadJsonUri() {
    let theJSON = JSON.stringify(this.data);
    let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }


}