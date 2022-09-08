import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Temporada } from 'src/app/models/temporada';
import { ItemFormulario } from 'src/app/pages/forms/form-simple/form-simple.component';
import { ProductoService } from 'src/app/services/producto.service';
import { TemporadaService } from 'src/app/services/temporada.service';

@Component({
  selector: 'app-temporadas',
  templateUrl: './temporadas.component.html',
  styleUrls: ['./temporadas.component.scss']
})
export class TemporadasComponent implements OnInit {

  data: Temporada[] = [];
  datoSelected: Temporada;
  loading: boolean = false;
  labels: { label: String, value: String }[] = [
    { label: 'Año', value: 'anio' },
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
    { type: 'text', value: 'descripcion', label: 'Descripcion', placeholder: 'Descripcion de la temporada', errorMessage: 'Ingrese una descripcion', validators: [Validators.required] },
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
        { id: 'Septiembre', descripcion: 'Septiembre' },
        { id: 'Octubre', descripcion: 'Octubre' },
        { id: 'Noviembre', descripcion: 'Noviembre' },
        { id: 'Diciembre', descripcion: 'Diciembre' },
      ], value: 'periodo', label: 'Periodo', placeholder: 'Nombre del producto', errorMessage: 'Ingrese un periodo', validators: [Validators.required]
    },
    { type: 'range-time-picker', data: [] ,value: ['fechainicio', 'fechafin'], label: 'Tiempo de vigencia', placeholder: '', errorMessage: 'Seleccione fecha de inicio y fin', validators: [Validators.required] },
    { type: 'select', value: 'idproducto', label: 'Producto', placeholder: 'Elija un producto', errorMessage: 'Seleccione un producto', validators: [Validators.required] },
  ];


  constructor(private temporadaService: TemporadaService, private productoService: ProductoService) {
  }

  ngOnInit(): void {
    this.buscar(null);
    this.buscarProducto();
  }

  buscarProducto() {
    this.productoService.getProductos()
      .subscribe(res => {
        this.itemsFormulario.pop();
        this.itemsFormulario.push(
          { type: 'select', data: res, value: 'idproducto', label: 'Producto', placeholder: 'Elija un producto', errorMessage: 'Seleccione un producto', validators: [Validators.required] },
        );
        this.itemsFormulario = [...this.itemsFormulario];
      }, err => {

      });
  }

  buscar = (args: any): void => {
    this.loading = true;
    this.temporadaService.getTemporadas()
      .subscribe(res => {
        console.log(res);
        this.data = res as Temporada[];
        this.loading = false;
      }, err => {
        console.log(err);
      });
  }


  valueResponse(response: Temporada) {
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
    this.temporadaService.postTemporada(args as Temporada)
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
    this.temporadaService.putTemporada(args as Temporada)
      .subscribe(res => {
        this.isVisible = false;
        this.editando = false;
      }, err => {
        console.log(err);
      });
  }

  remove = (args: any): void => {
    this.temporadaService.deleteTemporada(args)
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
