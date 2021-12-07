import { Component, OnInit } from '@angular/core';
import { getISOWeek } from 'date-fns';
import { PersonalVehiculo } from 'src/app/models/personal-vehiculo';
import { PuntoEntrega } from 'src/app/models/punto-entrega';
import { Registro } from 'src/app/models/registro';
import { ExcelService } from 'src/app/services/excel.service';
import { PersonalVehiculoService } from 'src/app/services/personal-vehiculo.service';
import { PuntoEntregaService } from 'src/app/services/punto-entrega.service';

@Component({
  selector: 'app-personal-vehiculo',
  templateUrl: './personal-vehiculo.component.html',
  styleUrls: ['./personal-vehiculo.component.scss']
})
export class PersonalVehiculoComponent implements OnInit {

  searchValue = '';
  puntoSelected:number;
  date:Date[];
  puntosEntrega: PuntoEntrega[];
  visible = false;
  listOfData: Registro[] = [];
  listOfDisplayData = [...this.listOfData];
  loading:boolean=false;
  buscado: boolean=false;

  constructor(private personalVehiculoService: PersonalVehiculoService, private puntoEntregaService: PuntoEntregaService, private excelService:ExcelService) {

  }

  ngOnInit(): void {
    this.getMantenedors();
  }

  exportarExcel(){
    this.excelService.exportAsExcelFile(this.listOfData, 'registros_'+this.puntoSelected);
  }

  getMantenedors() {
    this.puntoEntregaService.getPuntoEntregas()
      .subscribe(res => {
        this.puntosEntrega = res as PuntoEntrega[];
        let p=new PuntoEntrega();
        p.id=-1;
        p.nombre='Todas';
        this.puntoSelected=-1;
        this.puntosEntrega.splice(0, 0, p);
      }, err => {

      });
  }

  buscar() {
    this.loading=true;
    this.personalVehiculoService.byRange({
      inicio: this.date[0],
      fin: this.date[1],
      idpuntoentrega: this.puntoSelected,
    })
      .subscribe(res => {
        this.buscado=true;
        this.loading=false;
        this.listOfData = res as Registro[];
        this.listOfDisplayData = [...this.listOfData];
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
    this.listOfDisplayData = this.listOfData.filter((item: Registro) => item.codigosap.indexOf(this.searchValue) !== -1);
  }

}
