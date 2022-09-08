import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Vehiculo } from 'src/app/models/vehiculo';
import { ItemFormulario } from 'src/app/pages/forms/form-simple/form-simple.component';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {

  data: Vehiculo[] = [];
  datoSelected: Vehiculo;
  loading: boolean = false;
  labels: { label: String, value: String }[] = [
    { label: 'Placa', value: 'placa' },
    { label: 'Modelo', value: 'modelo' },
  ];
  isVisible: Boolean = false;
  editando: Boolean = false;
  itemsFormulario: ItemFormulario[] = [
    { type: 'text', value: 'placa', label: 'Placa', placeholder: 'Placa del vehiculo', errorMessage: 'Ingrese una placa', validators: [Validators.required] },
    { type: 'text', value: 'modelo', label: 'Modelo', placeholder: 'Modelo del vehiculo', errorMessage: 'Ingrese un modelo', validators: [Validators.required] },
    /* new ItemFormulario('placa', 'Placa', 'Placa del producto', 'Ingrese una placa', [Validators.required]),
    new ItemFormulario('modelo', 'Modelo', 'Modelo del producto' ,'Ingrese un modelo', [Validators.required,]), */
  ];


  constructor(private vehiculoService: VehiculoService,) {
  }

  ngOnInit(): void {
    this.buscar(null);

  }

  buscar = (args: any): void => {
    this.loading = true;
    this.vehiculoService.getVehiculos()
      .subscribe(res => {
        console.log(res);
        this.data = res as Vehiculo[];
        this.loading = false;
      }, err => {
        console.log(err);
      });
  }

  add = (args: any): void => {
    this.vehiculoService.getVehiculos()
      .subscribe(res => {
        this.data = res as Vehiculo[];
      });
  }

  valueResponse(response: Vehiculo) {
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
    this.vehiculoService.postVehiculo(args as Vehiculo)
      .subscribe(res => {
        this.isVisible = false;
        this.editando = false;
        this.data.push(res);
        this.data = [...this.data]
      }, err => {
        console.log(err);
      });
  }

  handleOkEdit = (args: any): void => {
    this.vehiculoService.putVehiculo(args as Vehiculo)
      .subscribe(res => {
        this.isVisible = false;
        this.editando = false;
        let index = this.data.findIndex(obj => obj.id === res.id);
        this.data[index] = res;
        this.data = [...this.data]
      }, err => {
        console.log(err);
      });
  }

  remove = (args: any): void => {
    this.vehiculoService.deleteVehiculo(args)
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

  getDetalle(): void {
    console.log('Enviar');
  }
}
