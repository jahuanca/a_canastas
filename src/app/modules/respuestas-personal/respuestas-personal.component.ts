import { Component, OnInit } from '@angular/core';
import { getISOWeek } from 'date-fns';
import { RespuestasPersonal } from 'src/app/models/respuestas-personal';
//import { PuntoEntrega } from 'src/app/models/punto-entrega';
import { Subdivision } from 'src/app/models/subdivision';
import { RegistroRespuesta } from 'src/app/models/registrorespuesta';
import { Encuesta } from 'src/app/models/encuesta';
import { ExcelService } from 'src/app/services/excel.service';
import { RespuestasPersonalService } from 'src/app/services/respuestas-personal.service';
//import { PuntoEntregaService } from 'src/app/services/punto-entrega.service';
import { SubdivisionService } from 'src/app/services/subdivision.service';
import { EncuestaService } from 'src/app/services/encuesta.service';
//import { Encuesta } from 'src/app/models/encuesta';

@Component({
  selector: 'app-respuestas-personal',
  templateUrl: './respuestas-personal.component.html',
  styleUrls: ['./respuestas-personal.component.scss']
})
export class RespuestasPersonalComponent implements OnInit {

  searchValue = '';
  subdivisionSelected:number;
  encuestaSelected:number;
  date:Date[];
 //puntosEntrega: PuntoEntrega[];
  subdivision : Subdivision[]
  encuesta: Encuesta[];
  visible = false;
  listOfData: RespuestasPersonal[] = [];
  listOfDisplayData = [...this.listOfData];
  loading:boolean=false;
  buscado: boolean=false;

  constructor(private respuestaspersonalService: RespuestasPersonalService, private subdivisionService: SubdivisionService, private excelService:ExcelService, private encuestaService:EncuestaService) {

  }

  ngOnInit(): void {
    this.getEncuesta();
    this.getMantenedors();
  }

  exportarExcel(){
    this.excelService.exportAsExcelFile(this.listOfData, 'registros_'+this.subdivisionSelected);
  }

  getEncuesta(){
    this.encuestaService.getEncuestas()
      .subscribe(res => {
        this.encuesta= res as Encuesta[];
        let t=new Encuesta();
        t.id=-1;
        t.descripcion= 'Todas';
        this.encuestaSelected=-1;
        this.encuesta.splice(0, 0, t);
      }, err =>{

      });
  }

  getMantenedors() {
    this.subdivisionService.getSubdivisions()
      .subscribe(res => {
        this.subdivision = res as Subdivision[];
        let p=new Subdivision();
        p.idsubdivision=-1;
        p.detallesubdivision='Todas';
        this.subdivisionSelected=-1;
        this.subdivision.splice(0, 0, p);
      }, err => {

      });
  }

  buscar() {
    this.loading=true;
    this.respuestaspersonalService.byRange({
      inicio: this.date[0],
      fin: this.date[1],
      idsubdivision: this.subdivisionSelected,
      idencuesta: this.encuestaSelected,
    })
      .subscribe(res => {
        this.buscado=true;
        this.loading=false;
        this.listOfData = res as RespuestasPersonal[];
        this.listOfDisplayData = [...this.listOfData];
        console.log(res);
      }, err => { });
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: RespuestasPersonal) => item.nrodocumento.indexOf(this.searchValue) !== -1);
  }

}
