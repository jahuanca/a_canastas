import { Component, OnInit } from '@angular/core';
import { Subdivision } from 'src/app/models/subdivision';
import { SubdivisionService } from 'src/app/services/subdivision.service';

@Component({
  selector: 'app-subdivisiones',
  templateUrl: './subdivisiones.component.html',
  styleUrls: ['./subdivisiones.component.scss']
})
export class SubdivisionesComponent implements OnInit {

  data: Subdivision[];
  labels: { label: String, value: String }[] = [
    { label: 'Codigo', value: 'idsubdivision' },
    { label: 'Nombre', value: 'detallesubdivision' },
    { label: 'Division', value: 'nombreDivision' },
  ];

  constructor(private subdivisionService: SubdivisionService,) { }
  
  ngOnInit(): void {
  }

  buscar = (args: any): void =>{
    this.subdivisionService.getSubdivisions()
      .subscribe(res => {
        this.data = res as Subdivision[];
      });
  }


}
