import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges } from '@angular/core';
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

@Component({
  selector: 'app-acciones-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
  /* changeDetection: ChangeDetectionStrategy.OnPush */
})
export class EncuestaComponent implements OnInit {

  isVisible: Boolean = false;
  @Input() id: number;
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
  cargandoTabla: boolean = true;
  currentTemplate: string = 'tabla';
  validateForm!: FormGroup;
  rango: Date[] = [new Date(), new Date()];
  detalles: EncuestaDetalle[];
  labels:string[]=[];
  dataGrafico: number[]=[];
  itemsFormulario: ItemFormulario[] = [

    { type: 'text', value: 'opcion', label: 'Opción', placeholder: 'Opción de la encuesta', errorMessage: 'Ingrese un opción', validators: [Validators.required] },
    { type: 'text', value: 'descripcion', label: 'Descripcion', placeholder: 'Descripcion de la encuesta', errorMessage: 'Ingrese una descripción', validators: [Validators.required] },
    { type: 'text', value: 'observacion', label: 'Observación', placeholder: 'Observación de la encuesta', errorMessage: 'Ingrese una observación', validators: [Validators.required] },
  ];

  constructor(private fb: FormBuilder, private encuestaOpcionService: EncuestaOpcionService, private encuestaDetalleService: EncuestaDetalleService) { }

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

    /* this.setGrafico(); */
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  goAcciones() {
    if (this.opciones == null) {
      this.getOpciones();
      this.getDetalles();
    }

    this.isVisible = !this.isVisible;
  }

  getDetalles() {
    this.encuestaDetalleService.getEncuestaDetallesByIdEncuesta(this.id)
      .subscribe(res => {
        this.cargandoTabla = false;
        this.detalles = res as EncuestaDetalle[];
        this.dataSet = [...this.detalles];
        this.setGrafico();
      }, err => {
        console.log(err);
      });
  }

  getOpciones() {
    this.encuestaOpcionService.getEncuestaOpcionsByIdEncuesta(this.id)
      .subscribe(res => {
        this.cargandoOpciones = false;
        this.opciones = res as EncuestaOpcion[];
        this.opciones.map( (e)=>{
          this.labels.push(e.opcion);
          this.dataGrafico.push(10);

        });
        
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
    console.log('eliminar');
    for (let i = 0; i < this.registrados.length; i++) {
      const element = this.registrados[i];
      if (this.opcionSeleccionada[0].id == element.id) {
        this.registrados.splice(i, 1);
        this.registradosCodigos.splice(i, 1);
        this.opcionSeleccionada[0].id = null;
        return;
      }
    }
  }

  registrarNuevo() {
    this.currentTemplate = 'nuevo';
  }

  editarRegistro() {
    this.editando=true;
    this.validateForm?.patchValue(this.opcionSeleccionada[0]);
    this.currentTemplate = 'editar';
  }

  handleCancel() {
    this.editando=false;
    this.currentTemplate = 'tabla';
  }

  nuevoObjeto:Object=new Object();
  editando:Boolean=false;
  handleOkEvent() {
    this.submitForm();
    if(this.validateForm.valid){
      this.nuevoObjeto['id']=this.validateForm.get('id').value;
      this.itemsFormulario.map((e) =>{

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
      
      this.nuevoObjeto['idencuesta']=this.id;

      if(this.editando){
        this.encuestaOpcionService.putEncuestaOpcion(this.nuevoObjeto as EncuestaOpcion)
          .subscribe( res=>{
            /* this.opciones.(this.nuevoObjeto as EncuestaOpcion); */
            this.opciones=[...this.opciones];
            this.validateForm.reset();
          })
      }else{
        this.encuestaOpcionService.postEncuestaOpcion(this.nuevoObjeto as EncuestaOpcion)
          .subscribe( res=>{
            this.opciones.push(this.nuevoObjeto as EncuestaOpcion);
            this.opciones=[...this.opciones];
            this.validateForm.reset();
          })
        
      }
      /* this.nuevoObjeto['isNew']=(this.editando) ? false : true; */
      /* this.valueResponse.emit(this.nuevoObjeto); */
    }else{
      console.log('el formulario no pudo ser validado');
    }
  }


  canvas: any;
  ctx: any;
  myChart:Chart;

  setGrafico() {

    var chartExist = Chart.getChart("myChart"); // <canvas> id
    if (chartExist != undefined)  chartExist.destroy();

    Chart.register(...registerables)

    

    this.canvas = document.getElementById('myChart');

    if (this.myChart) {
      this.myChart.destroy();
    }

    this.ctx = this.canvas?.getContext('2d');
    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Encuesta.',
          data: this.dataGrafico,
          backgroundColor: ["orange"],
          borderWidth: 1
        }]
      },
      options: {
        /* legend: { display: false }, */
        responsive: true,
        /* display: true */
      }
    });

  }


}
