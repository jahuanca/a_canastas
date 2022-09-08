import { Component, OnInit } from '@angular/core';
import { Labor } from 'src/app/models/labor';
import { LaborService } from 'src/app/services/labor.service';

@Component({
  selector: 'app-labores',
  templateUrl: './labores.component.html',
  styleUrls: ['./labores.component.scss']
})
export class LaboresComponent implements OnInit {

  data: Labor[];
  labels: { label: String, value: String }[] = [
    { label: 'Codigo', value: 'labor' },
    { label: 'Nombre', value: 'descripcion' },
    { label: 'Actividad', value: 'nombreActividad' },
  ];

  constructor(private laborService: LaborService,) { }
  
  ngOnInit(): void {
    /* this.sapService.getAbsentismo()
      .subscribe( res => {
        console.log(res);
      }, err=> {
        console.log('ERROR:');
        console.log(err);
      }) */
  }

  buscar = (args: any): void =>{
    this.laborService.getLabors()
      .subscribe(res => {
        this.data = res as Labor[];
      });
  }

  getDetalle(): void {
    console.log('Enviar');
  }


}
