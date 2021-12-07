import { Component, OnInit } from '@angular/core';
import { getISOWeek } from 'date-fns';
import { MantenedorTareo } from 'src/app/models/mantenedor-tareo';
import { PersonalTareaProceso } from 'src/app/models/personal-tarea-proceso';
import { MantenedorTareoService } from 'src/app/services/mantenedor-tareo.service';
import { PersonalTareaProcesoService } from 'src/app/services/personal-tarea-proceso.service';

class ByRango{
  fechaInicio: Date;
  fechaFin: Date;
  esRendimiento: boolean;
  esPacking: boolean;
}

@Component({
  selector: 'app-tareos-sap',
  templateUrl: './tareos-sap.component.html',
  styleUrls: ['./tareos-sap.component.scss']
})
export class TareosSapComponent implements OnInit {

  searchValue = '';
  mantenedors: MantenedorTareo[];
  visible = false;
  loading: boolean=false;
  listOfData: PersonalTareaProceso[] = [];
  listOfDisplayData = [...this.listOfData];

  constructor(private personalTareaProcesoService: PersonalTareaProcesoService, private mantenedorTareoService: MantenedorTareoService) {

  }

  ngOnInit(): void {
    this.getMantenedors();
  }

  getMantenedors() {
    this.mantenedorTareoService.getMantenedorTareos()
      .subscribe(res => {
        this.mantenedors = res as MantenedorTareo[];
      }, err => {

      });
  }

  buscar() {
    /* this.personalTareaProcesoService.byRango()
      .subscribe(res => {
        this.listOfData = res as PersonalTareaProceso[];
        this.listOfDisplayData = [...this.listOfData];
      }, err => { }); */
  }

  date = null;

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
    this.listOfDisplayData = this.listOfData.filter((item: PersonalTareaProceso) => item.codigoempresa.indexOf(this.searchValue) !== -1);
  }

}
