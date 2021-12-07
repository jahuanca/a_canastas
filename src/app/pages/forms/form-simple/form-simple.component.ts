import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';

export interface ItemFormulario{
  value: string | string[];
  label: string;
  type: string;
  placeholder: string;
  errorMessage: string;
  data?:any[];
  validators: ValidatorFn[];
}

@Component({
  selector: 'app-form-simple',
  templateUrl: './form-simple.component.html',
  styleUrls: ['./form-simple.component.scss']
})
export class FormSimpleComponent implements OnInit, OnChanges {

  @Input() isVisible: Boolean=false;
  @Input() editando: Boolean=false;
  @Input() titulo: string='';
  @Output() valueResponse: EventEmitter<Object> = new EventEmitter();
  @Input() handleOk: (args:any) => void;
  @Input() handleOkEdit: (args:any) => void;
  @Input() handleCancel: () => void;
  nuevoObjeto:Object=new Object();
  @Input() data;
  validateForm!: FormGroup;
  @Input() itemsFormulario:ItemFormulario[];

  constructor(private fb: FormBuilder) { }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: []
    });
    
    this.itemsFormulario.map( e =>{
      switch (typeof e.value) {
        case 'string':
          this.validateForm.addControl(e.value, new FormControl(null, e.validators));
          break;

        default:
          for (let i = 0; i < e.value.length; i++) {
            this.validateForm.addControl(e.value[i], new FormControl(null, e.validators)); 
          }
          break;
      }

    });
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.data!=null){
      this.validateForm.patchValue(this.data);
    }else{
      this.validateForm?.reset();
    }
  }

  handleOkEvent(){
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
      this.validateForm.reset();
      this.editando ? this.handleOkEdit(this.nuevoObjeto) : this.handleOk(this.nuevoObjeto);
      this.nuevoObjeto['isNew']=(this.editando) ? false : true;
      /* this.valueResponse.emit(this.nuevoObjeto); */
    }
  }

  onChange(result: Date[], labels:string[]): void {
    if(result == null || result == undefined || result.length == 0){
      return;
    }
    console.log('onChange: ', result);
    for (let i = 0; i < labels.length; i++) {
      /* this.validateForm.controls[element].value(result[i]); */
      console.log(labels[i]);
      this.validateForm.controls[labels[i]].setValue(new Date(result[i].toISOString())); 
      /* this.nuevoObjeto[labels[i]]=result[i]; */
    }
    console.log(this.validateForm);
  }
  datos:[]
}
