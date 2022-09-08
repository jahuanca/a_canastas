import { Component, OnInit } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { ItemFormulario } from 'src/app/pages/forms/form-simple/form-simple.component';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  data: Producto[];
  datoSelected: Producto;
  loading: boolean = false;
  labels: { label: String, value: String }[] = [
    { label: 'Nombre', value: 'descripcion' },
    { label: 'Unidad', value: 'unidad' },
  ];
  isVisible: Boolean = false;
  editando: Boolean = false;
  itemsFormulario: ItemFormulario[] = [
    /* new ItemFormulario('descripcion', 'Nombre', 'Nombre del producto', 'Ingrese una descripcion', [Validators.required]), */
    { value: 'descripcion', type: 'text', label: 'Nombre', placeholder: 'Nombre del producto', errorMessage: 'Ingrese una descripcion', validators: [Validators.required] },
    { value: 'unidad', type: 'text', label: 'Unidad', placeholder: 'Unidad del producto', errorMessage: 'Ingrese una unidad', validators: [Validators.required] },
    /* new ItemFormulario('unidad', 'Unidad', 'Unidad del producto' ,'Ingrese una unidad', [Validators.required,]), */
  ];


  constructor(private productoService: ProductoService,) {
  }

  ngOnInit(): void {
    this.buscar(null);

  }

  buscar = (args: any): void => {
    this.loading = true;
    this.productoService.getProductos()
      .subscribe(res => {
        this.loading = false;
        this.data = res as Producto[];
      }, err => {
        console.log(err);
      });
  }

  add = (args: any): void => {
    this.productoService.getProductos()
      .subscribe(res => {
        this.data = res as Producto[];
      });
  }

  valueResponse(response: Producto) {
    console.log(response);
    if (response['isNew']) {
      this.data.push(response);
    } else {
      //FIXME: no encuentra el indice correcto.
      let index = this.data.findIndex(obj => obj.id == response.id);
      console.log(index);
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
    this.isVisible = false;
    this.productoService.postProducto(args as Producto)
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
    this.productoService.putProducto(args as Producto)
      .subscribe(res => {
        this.isVisible = false;
        this.editando = false;
        let index = this.data.findIndex(obj => obj.id == res.id);
        console.log(index);
        this.data[index] = res;
        this.data=[...this.data];
      }, err => {
        console.log(err);
      });
  }

  update = (args: any): void => {
    this.editando = true;
    this.isVisible = true;
    this.datoSelected = Object.assign(args);
  }

  remove = (args: any): void => {
    this.productoService.deleteProducto(args)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  getDetalle(): void {
    console.log('Enviar');
  }

}
