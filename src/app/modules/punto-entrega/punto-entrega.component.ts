import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { PuntoEntrega } from 'src/app/models/punto-entrega';
import { ItemFormulario } from 'src/app/pages/forms/form-simple/form-simple.component';
import { PuntoEntregaService } from 'src/app/services/punto-entrega.service';

@Component({
  selector: 'app-punto-entrega',
  templateUrl: './punto-entrega.component.html',
  styleUrls: ['./punto-entrega.component.scss']
})
export class PuntoEntregaComponent implements OnInit {

  data: PuntoEntrega[];
  datoSelected: PuntoEntrega;
  loading: boolean = false;
  labels: { label: String, value: String }[] = [
    { label: 'Nombre', value: 'nombre' },
    { label: 'Descripcion', value: 'descripcion' },
  ];
  isVisible: Boolean = false;
  editando: Boolean = false;
  itemsFormulario: ItemFormulario[] = [
    { value: 'nombre', type: 'text', label: 'Nombre', placeholder: 'Nombre del punto entrega', errorMessage: 'Ingrese un nombre', validators: [Validators.required] },
    { value: 'descripcion', type: 'text', label: 'Descripción', placeholder: 'Descripción del punto entrega', errorMessage: 'Ingrese una descripción', validators: [Validators.required] },
  ];


  constructor(private puntoEntregaService: PuntoEntregaService,) {
  }

  ngOnInit(): void {
    this.buscar(null);

  }

  buscar = (args: any): void => {
    this.loading = true;
    this.puntoEntregaService.getPuntoEntregas()
      .subscribe(res => {
        this.loading = false;
        this.data = res as PuntoEntrega[];
      }, err => {
        console.log(err);
      });
  }

  add = (args: any): void => {
    this.puntoEntregaService.getPuntoEntregas()
      .subscribe(res => {
        this.data = res as PuntoEntrega[];
      });
  }

  valueResponse(response: PuntoEntrega) {
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
    this.puntoEntregaService.postPuntoEntrega(args as PuntoEntrega)
      .subscribe(res => {
        console.log(res);
        this.isVisible = false;
        this.editando = false;
        this.data.push(res);
        this.data = [...this.data];
      }, err => {
        console.log(err);
      });
  }

  handleOkEdit = (args: any): void => {
    this.puntoEntregaService.putPuntoEntrega(args as PuntoEntrega)
      .subscribe(res => {
        this.isVisible = false;
        this.editando = false;
        let index = this.data.findIndex(obj => obj.id === res.id);
        this.data[index] = res;
        this.data = [...this.data];
      }, err => {
        console.log(err);
      });
  }

  remove = (args: any): void => {
    this.puntoEntregaService.deletePuntoEntrega(args)
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
