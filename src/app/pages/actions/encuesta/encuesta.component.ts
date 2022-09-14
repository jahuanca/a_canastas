import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EncuestaDetalle } from 'src/app/models/encuesta-detalle';
import { EncuestaOpcion } from 'src/app/models/encuesta-opcion';
import { PersonalAptoTemporada } from 'src/app/models/personal-apto-temporada';
import { PersonalEmpresa } from 'src/app/models/personal-empresa';
import { EncuestaDetalleService } from 'src/app/services/encuesta-detalle.service';
import { EncuestaOpcionService } from 'src/app/services/encuesta-opcion.service';
import { PersonalAptoTemporadaService } from 'src/app/services/personal-apto-temporada.service';
import { ItemFormulario } from '../../forms/form-simple/form-simple.component';
import { Chart, registerables } from 'chart.js'
import { DataSetChart } from 'src/app/models/data-set-chart';
import { DatePipe } from '@angular/common';
import { Encuesta } from 'src/app/models/encuesta';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-acciones-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
  /* changeDetection: ChangeDetectionStrategy.OnPush */
})
export class EncuestaComponent implements OnInit {

  isVisible: Boolean = false;
  @Input() id: number;
  @Input() seleccionada: Encuesta;
  dataSet: EncuestaDetalle[];
  data: PersonalEmpresa[];
  opciones: EncuestaOpcion[];
  elegidos: string[] = [];
  registrados: PersonalAptoTemporada[] = [];
  registradosCodigos: string[] = [];
  opcionSeleccionada: EncuestaOpcion[];
  camposFiltrar: { value: String, label: string }[] = [
    { value: 'nrodocumento', label: 'N° Documento' },
    { value: 'codigoempresa', label: 'Codigo empresa' },
    { value: 'nombres', label: 'Nombres' },
    { value: 'apellidos', label: 'Apellidos' },
  ];
  campoElegido: string = 'nrodocumento';
  cargandoOpciones: boolean = true;
  cargandoDetalles: boolean = true;
  cargandoTabla: boolean = true;
  currentTemplate: string = 'tabla';
  validateForm!: FormGroup;
  rango: Date[] = [new Date(), new Date()];
  detalles: EncuestaDetalle[];
  labels: string[] = [];
  dataChart: DataSetChart[] = [];
  itemsFormulario: ItemFormulario[] = [

    { type: 'text', value: 'opcion', label: 'Opción', placeholder: 'Opción de la encuesta', errorMessage: 'Ingrese un opción', validators: [Validators.required] },
    { type: 'text', value: 'descripcion', label: 'Descripcion', placeholder: 'Descripcion de la encuesta', errorMessage: 'Ingrese una descripción', validators: [] },
    { type: 'text', value: 'observacion', label: 'Observación', placeholder: 'Observación de la encuesta', errorMessage: 'Ingrese una observación', validators: [] },
  ];
  canvas: any;
  ctx: any;
  chart: Chart;
  @ViewChild('chart', { static: false }) chartRef?: ElementRef;
  canvasCircle: any;
  ctxCircle: any;
  chartCircle: Chart;
  textoFechas:string='';
  dataToExport=new Map();
  isLoading:Boolean=false;
  @ViewChild('chartCircle', { static: false }) chartRefCircle?: ElementRef;

  constructor(private message: NzMessageService, private fb: FormBuilder, private encuestaOpcionService: EncuestaOpcionService, private encuestaDetalleService: EncuestaDetalleService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: []
    });

    this.itemsFormulario.map(e => {
      switch (typeof e.value) {
        case 'string':
          this.validateForm.addControl(e.value, new FormControl(null, e.validators));
          break;
      }

    });


  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  goAcciones() {
    if (this.opciones == null) {
      /* this.getOpciones();
      this.getDetalles(); */
      this.allContent();
    } else {
      this.setGrafico();
    }

    this.isVisible = true;
  }



  allContent() {
    this.textoFechas = (this.rango[0]!=this.rango[1]) ?
    `${new DatePipe('en-US').transform(this.rango[0], 'd/MM/yy')} - ${new DatePipe('en-US').transform(this.rango[1], 'd/MM/yy')}`
    : `${new DatePipe('en-US').transform(this.rango[0], 'd/MM/yy')}`;
    this.cargandoDetalles=true;
    this.dataChart=[];
    this.labels=[];
    Promise.all<any[]>(
      [
        this.encuestaOpcionService.getEncuestaOpcionsByIdEncuesta(this.id).toPromise(), 
        this.encuestaDetalleService.postEncuestasDetallesByIdEncuestaAndRange(this.id, this.rango[0], this.rango[1]).toPromise()
      ])
      .then(results => {
        let data=new Map();
        this.opciones=[];
        if (results[0] instanceof Array) {
          this.cargandoOpciones = false;
          this.opciones = results[0] as EncuestaOpcion[];

          for (let i = 0; i < this.opciones.length; i++) {
            const e = this.opciones[i];
            data.set(e.id, 0)
          }
        }

        if (results[1] instanceof Array) {
          this.cargandoTabla = false;
          this.detalles = results[1] as EncuestaDetalle[];
          this.dataSet = [...this.detalles];
          data.set(-1, 0);

          for (let i = 0; i < this.detalles.length; i++) {
            const e = this.detalles[i];
            if(e.idopcionencuesta){
              data.set(e.idopcionencuesta, data.get(e.idopcionencuesta) + 1 );
            }else{
              data.set(-1, data.get(-1) + 1);
            }
          }
        }

        if (results[0] instanceof Array && results[1] instanceof Array) {
          
          this.message.create('success', `Consulta cargada.`, {
            nzDuration: 1000
          });

          this.dataToExport.set('Encuesta', this.seleccionada);
          this.dataToExport.set('Detalles', this.detalles);
          this.dataToExport.set('Opciones', this.opciones);

          let d:number[]=[];
          let c:string[]=[];
          let l:string[]=[];
          
          for (let i = 0; i < this.opciones.length; i++) {
            const e = this.opciones[i];
            
            d.push(data.get(e.id));
            c.push(this.generateRandomColor());
            l.push(e.opcion);
            this.dataChart.push(new DataSetChart({ 
              label: e.opcion,
              data: [data.get(e.id)], 
              borderWidth: 1, 
              backgroundColor: [c[c.length-1]] }));
            
          }
          
          l.push('Otra');
          this.dataChart.push(new DataSetChart({ 
            label: 'Otra',
            data: [data.get(-1)], 
            borderWidth: 1, 
            backgroundColor: [this.generateRandomColor()] }));
          
          d.push(data.get(-1));
          c.push(this.generateRandomColor());

          this.setGrafico();
          this.setGraficoCircle(
            l,
            new DataSetChart(
              {
                label: this.seleccionada.titulo,
                borderWidth: 1,
                backgroundColor: c,
                data: d
              }
            )
          );
        }

      });
  }

  getOpciones() {
    this.encuestaOpcionService.getEncuestaOpcionsByIdEncuesta(this.id)
      .subscribe(res => {
        this.cargandoOpciones = false;
        this.opciones = res as EncuestaOpcion[];
        this.opciones.map((e) => {
          this.labels.push(e.opcion);
          /* this.dataChart.push(
            new DataSetChart({ label: e.opcion, data: [10], borderWidth: 1, backgroundColor: [this.generateRandomColor()] })
          ); */
        });

        /* this.labels.push('Otra'); */

      },
        err => {
        });
  }

  onSearchChange(searchValue: string): void {
    let filtrados = [];
    if (searchValue.trim() == '') {
      /* this.dataSet = [...this.data]; */
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
        this.elegidos.splice(i, 1);
        return;
      }
    }
    this.elegidos.push(p.codigoempresa);
  }

  enviar() {
    let objetos: PersonalAptoTemporada[] = [];
    this.elegidos.map(e => {

      let p = new PersonalAptoTemporada();

      p.id = this.id;
      p.idestado = 1;
      p.idusuario = 1;
      p.codigosap = e;
      objetos.push(
        p
      );
    });

    /* this.personalAptoTemporadaService.createMany(objetos)
      .subscribe(res => {
        console.log(res);
        this.isVisible = false;
      }, err => {

      }); */
  }

  eliminarRegistrado() {
    this.encuestaOpcionService.deleteEncuestaOpcion(this.opcionSeleccionada[0].id)
      .subscribe( res=>{
        let index=this.opciones.findIndex( (e)=> e.id == this.opcionSeleccionada[0].id);
        this.opciones.splice(index, 1);
        this.opciones=[...this.opciones];
        this.opcionSeleccionada=null;
        this.message.create('success', `Opción eliminada.`);
      }, err => {
        this.message.create('error', err.toString());
      }
      
      )
    /* for (let i = 0; i < this.registrados.length; i++) {
      const element = this.registrados[i];
      if (this.opcionSeleccionada[0].id == element.id) {
        this.registrados.splice(i, 1);
        this.registradosCodigos.splice(i, 1);
        this.opcionSeleccionada[0].id = null;
        return;
      }
    } */
  }

  registrarNuevo() {
    this.currentTemplate = 'nuevo';
  }

  editarRegistro() {
    this.editando = true;
    this.validateForm?.patchValue(this.opcionSeleccionada[0]);
    this.currentTemplate = 'editar';
  }

  handleCancel() {
    this.editando = false;
    this.currentTemplate = 'tabla';
  }

  goCerrar() {
    this.editando = false;
    this.currentTemplate = 'tabla';
    this.chart.destroy();
  }

  nuevoObjeto: Object = new Object();
  editando: Boolean = false;
  handleOkEvent() {
    this.submitForm();
    if (this.validateForm.valid) {

      this.isLoading=true;

      this.nuevoObjeto['id'] = this.validateForm.get('id').value;
      this.itemsFormulario.map((e) => {

        switch (typeof e.value) {
          case 'string':
            this.nuevoObjeto[e.value] = this.validateForm.get(e.value).value;
            break;

          default:
            for (let i = 0; i < e.value.length; i++) {
              const element = e.value[i];
              this.nuevoObjeto[element] = this.validateForm.get(element).value;
            }
            break;
        }
      });

      this.nuevoObjeto['idencuesta'] = this.id;

      if (this.editando) {
        this.encuestaOpcionService.putEncuestaOpcion(this.nuevoObjeto as EncuestaOpcion)
          .subscribe(res => {
            let index=this.opciones.findIndex((e)=> e.id== res.id);
            this.opciones[index]=res as EncuestaOpcion;
            this.opciones = [...this.opciones];
            this.editando=false;
            
            this.validateForm.reset();
            
            this.isLoading=false;
            this.message.create('success', `Opción editada.`);
            this.currentTemplate = 'tabla';
          }, err => {
            this.isLoading=false;
            this.message.create('error', `Ocurrió un error.`);
          })
      } else {
        this.encuestaOpcionService.postEncuestaOpcion(this.nuevoObjeto as EncuestaOpcion)
          .subscribe(res => {
            
            this.opciones.push(res as EncuestaOpcion);
            this.opciones = [...this.opciones];
            this.validateForm.reset();

            this.isLoading=false;
            this.message.create('success', `Opción agregada.`);
            this.currentTemplate = 'tabla';
            
          }, err => {
            this.isLoading=false;
            this.message.create('error', `Ocurrió un error.`);
          })

      }
      /* this.nuevoObjeto['isNew']=(this.editando) ? false : true; */
      /* this.valueResponse.emit(this.nuevoObjeto); */
    } else {
      console.log('el formulario no pudo ser validado');
    }
  }

  setGrafico() {
    Chart.register(...registerables)
    this.canvas = document?.getElementById('chart');

    if (this.chart != undefined) {
      this.chart.destroy();
    }

    this.ctx = this.chartRef?.nativeElement?.getContext('2d');

    this.chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: [this.seleccionada.titulo],
        datasets: this.dataChart,
      },
      options: {
        responsive: true,
      }
    });
    
    this.chart.update();
  }

  consultar(){
    this.allContent();
  }

  setGraficoCircle( labels:string[],value:DataSetChart) {
    Chart.register(...registerables)
    this.canvasCircle = document?.getElementById('chartCircle');

    if (this.chartCircle != undefined) {
      this.chartCircle.destroy();
    }

    this.ctxCircle = this.chartRefCircle?.nativeElement?.getContext('2d');
    
    this.chartCircle = new Chart(this.ctxCircle, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          value
        ],
      },
      options: {
        responsive: true,
      }
    });
    
    this.chart.update();
  }

  generateRandomColor(): string {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber: any = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
  }

}
