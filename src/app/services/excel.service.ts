import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({ providedIn: 'root' })
export class ExcelService {
  constructor() { }
  public exportAsExcelFile(json: any, excelFileName: string): void {
    let excelBuffer: any;
    /* let workbook: XLSX.WorkBook; */
    const libro: XLSX.WorkBook = XLSX.utils.book_new();
    if (json instanceof Map) {
      let hoja: XLSX.WorkSheet;
      json.forEach((value: any, key: string) => {
        console.log(key, value);
        let data = this.createContent(value);
        hoja = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(libro, hoja, key);
        XLSX.write(libro, { bookType: 'xlsx', type: 'array' });
      });

      excelBuffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });
    } else {
      json = this.createContent(json);
      let hoja = XLSX.utils.json_to_sheet(json);
      XLSX.utils.book_append_sheet(libro, hoja, 'data');
      excelBuffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });
    }

    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  createContent(json: any) {
    if (Array.isArray(json)) {
      for (let i = 0; i < json.length; i++) {
        const e = { ...json[i] };
        for (const key in e) {
          const element = e[key];
          if (element instanceof Date) {
            e[key] = new DatePipe('en-US').transform(element, 'short')
          }
          if (typeof element == 'object' && element != null && element != undefined) {
            e[key] = element.toString();
          }
        }

        json[i] = e;
      }
    } else {
      const e = { ...json };
      for (const key in e) {
        const element = e[key];
        if (element instanceof Date) {
          e[key] = new DatePipe('en-US').transform(element, 'short')
        }
        if (typeof element == 'object' && element != null && element != undefined) {
          e[key] = element.toString();
        }
      }
      json = e;
      return [json];
    }
    return json;
  }


  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}