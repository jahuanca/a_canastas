import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/actividad';
import { PersonalTareaProceso } from 'src/app/models/personal-tarea-proceso';
import { ActividadService } from 'src/app/services/actividad.service';
import { SAPService } from 'src/app/services/sap.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit {

  data: Actividad[];
  labels: { label: String, value: String }[] = [
    { label: 'Codigo', value: 'actividad' },
    { label: 'Nombre', value: 'descripcion' },
    { label: 'Tipo', value: 'rendimiento' },
  ];

  constructor(private actividadService: ActividadService, private sapService:SAPService) { }
  
  ngOnInit(): void {
    this.sapService.getAbsentismo()
      .subscribe( res => {
        console.log(res);
      }, err=> {
        console.log(err);
      })
  }

  buscar = (args: any): void =>{
    this.actividadService.getActividads()
      .subscribe(res => {
        this.data = res as Actividad[];
      });
  }

  getDetalle(): void {
    console.log('Enviar');
  }

}
