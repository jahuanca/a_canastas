import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Encuesta } from 'src/app/models/encuesta';
import { ItemFormulario } from 'src/app/pages/forms/form-simple/form-simple.component';
import { ProductoService } from 'src/app/services/producto.service';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {

  data: Encuesta[] = [];
  datoSelected: Encuesta;
  loading: boolean = false;
  labels: { label: String, value: String }[] = [
    { label: 'Año', value: 'anio' },
    { label: 'Titulo', value: 'titulo' },
    { label: 'Descripcion', value: 'descripcion' },
    { label: 'Periodo', value: 'periodo' },
  ];
  isVisible: Boolean = false;
  editando: Boolean = false;
  itemsFormulario: ItemFormulario[] = [
    {
      type: 'select', data: [
        { id: new Date().getFullYear().toString() , descripcion: new Date().getFullYear().toString() },
        { id: (new Date().getFullYear() + 1).toString(), descripcion: (new Date().getFullYear() + 1).toString() },
        { id: (new Date().getFullYear() + 2).toString(), descripcion: (new Date().getFullYear() + 2).toString() },
      ],
      value: 'anio', label: 'Año', placeholder: 'Nombre de la temporada', errorMessage: 'Ingrese un nombre', validators: [Validators.required]
    },
    { type: 'text', value: 'titulo', label: 'Titulo', placeholder: 'Título de la encuesta', errorMessage: 'Ingrese un título', validators: [Validators.required] },
    { type: 'text', value: 'descripcion', label: 'Descripcion', placeholder: 'Descripcion de la encuesta', errorMessage: 'Ingrese una descripcion', validators: [Validators.required] },
    {
      type: 'select', data: [
        { id: 'Enero', descripcion: 'Enero' },
        { id: 'Febrero', descripcion: 'Febrero' },
        { id: 'Marzo', descripcion: 'Marzo' },
        { id: 'Abril', descripcion: 'Abril' },
        { id: 'Mayo', descripcion: 'Mayo' },
        { id: 'Junio', descripcion: 'Junio' },
        { id: 'Julio', descripcion: 'Julio' },
        { id: 'Agosto', descripcion: 'Agosto' },
        { id: 'Setiembre', descripcion: 'Setiembre' },
        { id: 'Octubre', descripcion: 'Octubre' },
        { id: 'Noviembre', descripcion: 'Noviembre' },
        { id: 'Diciembre', descripcion: 'Diciembre' },
      ], value: 'periodo', label: 'Periodo', placeholder: 'Mes del periodo', errorMessage: 'Seleccione un periodo', validators: [Validators.required]
    },
    { type: 'range-time-picker', data: [] ,value: ['fechaInicio', 'fechaFin'], label: 'Tiempo de vigencia', placeholder: '', errorMessage: 'Seleccione fecha de inicio y fin', validators: [Validators.required] },
  ];


  constructor(private encuestaService: EncuestaService) {
  }

  ngOnInit(): void {
    this.buscar(null);
  }

  buscar = (args: any): void => {
    this.loading = true;
    this.encuestaService.getEncuestas()
      .subscribe(res => {
        this.data = res as Encuesta[];
        this.loading = false;
      }, err => {
        console.log(err);
      });
  }


  valueResponse(response: Encuesta) {
    if (response['isNew']) {
      this.data.push(response);
    } else {
      let index = this.data.findIndex(obj => obj.id === response.id);
      this.data[index] = response;
    }
    this.data = [...this.data];
  }

  agregar = (args: any): void => {
    this.datoSelected = null;
    this.isVisible = true;
    this.editando = false;
  }

  handleCancel = (args: any): void => {
    this.isVisible = false;
    this.datoSelected = null;
    this.editando = false;
  }

  handleOk = (args: any): void => {
    console.log(args);
    this.encuestaService.postEncuesta(args as Encuesta)
      .subscribe(res => {
        this.isVisible = false;
        this.editando = false;
        this.data.push(res);
        this.data=[...this.data];
      }, err => {
        console.log(err);
      });
  }

  handleOkEdit = (args: any): void => {
    this.encuestaService.putEncuesta(args as Encuesta)
      .subscribe(res => {
        this.isVisible = false;
        this.editando = false;
      }, err => {
        console.log(err);
      });
  }

  remove = (args: any): void => {
    this.encuestaService.deleteEncuesta(args)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  update = (args: any): void => {
    this.editando = true;
    this.isVisible = true;
    this.datoSelected = args;
  }

}
