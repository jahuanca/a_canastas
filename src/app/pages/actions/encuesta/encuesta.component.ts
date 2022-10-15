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
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { Pregunta } from 'src/app/models/pregunta';
import { Opcion } from 'src/app/models/opcion';

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
  preguntas: Pregunta[];
  elegidos: string[] = [];
  registrados: PersonalAptoTemporada[] = [];
  registradosCodigos: string[] = [];
  camposFiltrar: { value: String, label: string }[] = [
    { value: 'nrodocumento', label: 'N° Documento' },
    { value: 'codigoempresa', label: 'Codigo empresa' },
    { value: 'nombres', label: 'Nombres' },
    { value: 'apellidos', label: 'Apellidos' },
  ];
  campoElegido: string = 'nrodocumento';
  cargandoPreguntas: boolean = true;
  cargandoDetalles: boolean = true;
  currentTemplate: string;
  validateForm!: FormGroup;
  rango: Date[] = [new Date(), new Date()];
  detalles: EncuestaDetalle[];
  labels: string[] = [];
  dataChart: DataSetChart[] = [];
  valueOpcion: string;
  opcionesPregunta: Opcion[]=[];

  itemsFormularioPregunta: ItemFormulario[] = [

    { type: 'text', value: 'pregunta', label: 'Pregunta', placeholder: 'Titulo de la pregunta', errorMessage: 'Titule la pregunta', validators: [Validators.required] },
    { type: 'text', value: 'descripcion', label: 'Descripcion', placeholder: 'Descripcion de la encuesta', errorMessage: 'Ingrese una descripción', validators: [] },
    {
      type: 'select', data: [
        { id: 1, descripcion: 'Opción unica' },
        { id: 2, descripcion: 'Opción multiple' },
      ], value: 'idtipopregunta', label: 'Tipo', placeholder: 'Tipo de pregunta', errorMessage: 'Seleccione el tipo', validators: [Validators.required]
    },
    {
      type: 'select', data: [
        { id: true, descripcion: 'Si' },
        { id: false, descripcion: 'No' },
      ], value: 'permitirOpcionManual', label: 'Permitir opción manual', placeholder: 'Permitir opción manual', errorMessage: 'Seleccione el tipo', validators: [Validators.required]
    },
  ];
  canvas: any;
  ctx: any;
  chart: Chart;
  @ViewChild('chart', { static: false }) chartRef?: ElementRef;
  canvasCircle: any;
  ctxCircle: any;
  chartCircle: Chart;
  textoFechas: string = '';
  dataToExport = new Map();
  isLoading: Boolean = false;
  preguntaSelected: Pregunta;
  opcionSelected: Opcion;
  accionOpcion: string = '';
  @ViewChild('chartCircle', { static: false }) chartRefCircle?: ElementRef;

  constructor(
    private message: NzMessageService,
    private fb: FormBuilder,
    private modal: NzModalService,

    private preguntaService: PreguntaService
  ) { }

  ngOnInit(): void {

    this.currentTemplate = 'tabla';

    this.validateForm = this.fb.group({
      id: []
    });

    this.itemsFormularioPregunta.map(e => {
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

  indexOpcionSelected:number;

  changeOpcion(i: Opcion, index:number) {
    if(i.id==-1) return;
    this.opcionSelected = i;
    this.indexOpcionSelected=index;
  }

  goAcciones() {
    if (this.preguntas == null) {
      this.allContent();
    } else {
      //this.setGrafico();
    }

    this.isVisible = true;
    window.scrollTo(0, 0);
  }

  allContent() {
    Promise.all<any[]>(
      [
        this.preguntaService.getPreguntasByIdEncuesta(this.id).toPromise(),
      ])
      .then(results => {
        let data = new Map();
        this.preguntas = [];
        if (results[0] instanceof Array) {
          this.cargandoPreguntas = false;
          this.preguntas = results[0] as Pregunta[];
          console.log(this.preguntas);
        }
      });
  }

  public goNuevaPregunta(): void {
    this.currentTemplate = 'nueva_pregunta';
    this.validateForm.reset();
    this.opcionesPregunta = [];
  }

  goEditarOpcion(data: Opcion) {
    this.opcionSelected = data;
    this.accionOpcion = 'editar_opcion';
    this.valueOpcion = data.opcion;
  }

  eliminarOpcion(index:number){
    if(this.indexOpcionSelected==null) return;
    let o=this.opcionesPregunta[index];
    o.id=-1;
    this.opcionesPregunta[index]=o;
    this.opcionesPregunta=[...this.opcionesPregunta];
    this.indexOpcionSelected=null;
    this.opcionSelected=null;
    this.valueOpcion = '';
    this.accionOpcion = '';
  }

  agregarOpcion() {
    let o = new Opcion();
  
    o.idpregunta = this.preguntaSelected?.id;
    o.opcion = this.valueOpcion;
    switch (this.accionOpcion.trim()) {
      case 'editar_opcion':
        o.id=this.opcionSelected.id;
        let index = this.opcionesPregunta.findIndex((e) => e.id == this.opcionSelected.id);
        this.opcionesPregunta[index]=o;
        this.opcionesPregunta = [...this.opcionesPregunta];
        this.valueOpcion = '';
        this.accionOpcion = '';
        break;

      default:
        this.opcionesPregunta.push(o);
        this.valueOpcion = '';
        this.accionOpcion = '';
        break;
    }

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

  }

  eliminarPregunta(id:number) {
    this.preguntaService.deletePregunta(id)
      .subscribe(res => {
        let index = this.preguntas.findIndex((e) => e.id == id);
        this.preguntas.splice(index, 1);
        this.preguntas = [...this.preguntas];
        this.preguntaSelected = null;
        this.message.create('success', `Pregunta eliminada.`);
      }, err => {
        this.message.create('error', err.toString());
      }

      )
  }

  registrarNuevo() {
    this.currentTemplate = 'nuevo';
  }

  editarRegistro() {
    this.editando = true;
    this.validateForm?.patchValue(this.preguntaSelected[0]);
    this.currentTemplate = 'editar';
  }

  handleCancel() {
    this.editando = false;
    this.currentTemplate = 'tabla';
    this.opcionesPregunta=[];
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

      this.isLoading = true;

      this.nuevoObjeto['id'] = this.validateForm.get('id').value;
      this.itemsFormularioPregunta.map((e) => {

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
      this.nuevoObjeto['Opcions']=this.opcionesPregunta;
      if (this.editando) {
        this.preguntaService.putPregunta(this.nuevoObjeto as Pregunta)
          .subscribe(res => {
            let index = this.preguntas.findIndex((e) => e.id == res.id);
            this.preguntas[index] = res as Pregunta;
            this.preguntas = [...this.preguntas];
            this.editando = false;

            this.validateForm.reset();

            this.isLoading = false;
            this.message.create('success', `Pregunta editada.`);
            this.currentTemplate = 'tabla';
          }, err => {
            this.isLoading = false;
            this.message.create('error', `Ocurrió un error.`);
          })
      } else {
        this.preguntaService.postPregunta(this.nuevoObjeto as Pregunta)
          .subscribe(res => {
            this.preguntas.push(res as Pregunta);
            this.preguntas = [...this.preguntas];
            this.validateForm.reset();

            this.isLoading = false;
            this.message.create('success', `Pregunta agregada.`);
            this.currentTemplate = 'tabla';

          }, err => {
            this.isLoading = false;
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

  consultar() {
    this.allContent();
  }

  setGraficoCircle(labels: string[], value: DataSetChart) {
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

  showUpdatePreguntaConfirm(data: Pregunta) {
    this.modal.confirm({
      nzTitle: 'Advertencia',
      nzContent: `¿Desea editar esta pregunta? <b style="color: red;"></b>`,
      nzOkText: 'Si',
      nzOkType: 'primary',
      /* nzOkDanger: true, */
      nzOnOk: () => this.updatePregunta(data),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  updatePregunta(data: Pregunta) {
    this.editando = true;
    this.isVisible = true;
    this.validateForm?.patchValue(data);
    this.preguntaSelected = data;
    this.currentTemplate = 'nueva_pregunta'
    this.opcionesPregunta = this.preguntaSelected.Opcions;
    //this.itemsFormularioPregunta = Object.assign(data);
  }

  showDeletePreguntaConfirm(id: number) {
    this.modal.confirm({
      nzTitle: 'Advertencia',
      nzContent: `¿Desea eliminar esta pregunta? <b style="color: red;"></b>`,
      nzOkText: 'Si',
      nzOkType: 'primary',
      /* nzOkDanger: true, */
      nzOnOk: () => this.eliminarPregunta(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  remove(id: number) {

  }

}
