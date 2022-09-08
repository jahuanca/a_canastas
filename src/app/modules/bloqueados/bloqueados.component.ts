import { Component, OnInit } from '@angular/core';
import { PersonalEmpresa } from 'src/app/models/personal-empresa';
import { PersonalEmpresaService } from 'src/app/services/personal-empresa.service';

@Component({
  selector: 'app-bloqueados',
  templateUrl: './bloqueados.component.html',
  styleUrls: ['./bloqueados.component.scss']
})
export class BloqueadosComponent implements OnInit {

  data: PersonalEmpresa[];
  datoSelected: PersonalEmpresa;
  loading: boolean = false;
  labels: { label: String, value: String }[] = [
    { label: 'Codigo', value: 'codigoempresa' },
    { label: 'Nombre', value: 'nombreCompleto' },
  ];
  isVisible: Boolean = false;
  editando: Boolean = false;


  constructor(private personalEmpresaService: PersonalEmpresaService,) {
  }

  ngOnInit(): void {
    this.buscar(null);

  }

  buscar = (args: any): void => {
    this.loading = true;
    this.personalEmpresaService.getPersonalEmpresasBloqueado()
      .subscribe(res => {
        this.loading = false;
        this.data = res as PersonalEmpresa[];
      }, err => {
        console.log(err);
      });
  }

  add = (args: any): void => {
    /* this.personalEmpresaService.getProductos()
      .subscribe(res => {
        this.data = res as Producto[];
      }); */
  }

  valueResponse(response: PersonalEmpresa) {
    console.log(response);
    if (response['isNew']) {
      this.data.push(response);
    } else {
      //FIXME: no encuentra el indice correcto.
      let index = this.data.findIndex(obj => obj.codigoempresa == response.codigoempresa);
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
    /* this.personalEmpresaService.postProducto(args as Producto)
      .subscribe(res => {
        console.log(res);
        this.isVisible = false;
        this.editando = false;
        this.data.push(res);
        this.data = [...this.data];
      }, err => {
        console.log(err);
      }); */
  }

  handleOkEdit = (args: any): void => {
    /* this.personalEmpresaService.putProducto(args as Producto)
      .subscribe(res => {
        this.isVisible = false;
        this.editando = false;
        let index = this.data.findIndex(obj => obj.id == res.id);
        console.log(index);
        this.data[index] = res;
        this.data=[...this.data];
      }, err => {
        console.log(err);
      }); */
  }

  update = (args: any): void => {
    this.editando = true;
    this.isVisible = true;
    this.datoSelected = Object.assign(args);
  }

  remove = (args: any): void => {
    /* this.personalEmpresaService.deleteProducto(args)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }); */
  }

  getDetalle(): void {
    console.log('Enviar');
  }

}
