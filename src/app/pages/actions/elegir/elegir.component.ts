import { Component, Input, OnInit } from '@angular/core';
import { PersonalAptoTemporada } from 'src/app/models/personal-apto-temporada';
import { PersonalEmpresa } from 'src/app/models/personal-empresa';
import { PersonalAptoTemporadaService } from 'src/app/services/personal-apto-temporada.service';
import { PersonalEmpresaService } from 'src/app/services/personal-empresa.service';

@Component({
  selector: 'app-elegir',
  templateUrl: './elegir.component.html',
  styleUrls: ['./elegir.component.scss']
})
export class ElegirComponent implements OnInit {

  isVisible: Boolean = false;
  @Input() idTemporada: number;
  dataSet: PersonalEmpresa[];
  data: PersonalEmpresa[];
  elegidos: string[] = [];
  registrados: PersonalAptoTemporada[];
  registradosCodigos: string[] = [];
  idRegistrado:number;
  camposFiltrar: { value: String, label: string }[] = [
    { value: 'nrodocumento', label: 'N° Documento' },
    { value: 'codigoempresa', label: 'Codigo empresa' },
    { value: 'nombres', label: 'Nombres' },
    { value: 'apellidos', label: 'Apellidos' },
  ];
  campoElegido: string = 'nrodocumento';
  cargandoRegistrados:boolean=true;
  cargandoTabla:boolean=true;

  constructor(private personalEmpresaService: PersonalEmpresaService, private personalAptoTemporadaService: PersonalAptoTemporadaService) { }

  ngOnInit(): void {
    
  }

  getPersonalRegistrado() {
    this.personalAptoTemporadaService.getPersonalAptoTemporadasByIdTemporada(this.idTemporada)
      .subscribe(res => {
        this.cargandoRegistrados=false;
        this.registrados=res as PersonalAptoTemporada[];
        this.registrados.map(e =>{
          this.registradosCodigos.push(e.codigosap);
        });
      }, err => {

      });
  }

  getPersonalEmpresa() {
    this.personalEmpresaService.getPersonalEmpresas()
      .subscribe(res => {
        this.cargandoTabla=false;
        this.data = res as PersonalEmpresa[];
        this.dataSet = [...this.data];
      },
        err => { });
  }

  onSearchChange(searchValue: string): void {
    let filtrados = [];
    if (searchValue.trim() == '') {
      this.dataSet = [...this.data];
      return;
    }
    this.data.forEach(e => {
      if (e[this.campoElegido].trim().toLowerCase().includes(searchValue.trim().toLowerCase())) {
        filtrados.push(e);
      }
      this.dataSet = [...filtrados];
    });
  }

  check(p: PersonalEmpresa) {
    for (let i = 0; i < this.elegidos.length; i++) {
      const element = this.elegidos[i];
      if (element == p.codigoempresa) {
        this.elegidos.splice(i,1);
        return;
      }
    }
    this.elegidos.push(p.codigoempresa);
  }

  goAcciones(){
    this.isVisible=true;
    if(!this.data) this.getPersonalEmpresa();
    if(!this.registrados) this.getPersonalRegistrado();

  }

  enviar() {
    let objetos: PersonalAptoTemporada[] = [];
    this.elegidos.map(e => {

      let p = new PersonalAptoTemporada();

      p.idtemporada = this.idTemporada;
      p.idestado = 1;
      p.idusuario = 1;
      p.codigosap = e;
      objetos.push(
        p
      );
    });

    this.personalAptoTemporadaService.createMany(objetos)
      .subscribe(res => {
        console.log(res);
        this.isVisible = false;
      }, err => {

      });
  }

  eliminarRegistrado(){
    console.log('eliminar');
    for (let i = 0; i < this.registrados.length; i++) {
      const element = this.registrados[i];
      if(this.idRegistrado==element.id){
        this.registrados.splice(i,1);
        this.registradosCodigos.splice(i,1);
        this.idRegistrado=null;
        return;
      }
    }
  }


}
