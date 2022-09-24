import { Deserializable } from "./deserializable";
import { PersonalEmpresa } from "./personal-empresa";
import { DatePipe } from "@angular/common";
import { PuntoEntrega } from "./punto-entrega";
//import { RespuestasPersonal } from "./respuestas-personal";

export class RespuestasPersonal implements Deserializable{

    id: number;
    subdivision: string;
    descripcion: string;
    anio: string;
    periodo:string;
    pregunta:string;
    titulo:string;
    opcion:string;
    opcionmanual:string;
    nombrecompleto:string
    nrodocumento:string
    fecha: Date;
    hora: Date;
    estado:string;
    createdAt: Date;
    updatedAt: Date;

    constructor() {

    }

    deserialize(input: any) {
        Object.assign(this, input);
        //this.Punto_Entrega= new PuntoEntrega().deserialize(input['Punto_Entrega']);
        //this.Personal_Empresa= new PersonalEmpresa().deserialize(input['Personal_Empresa']);
        //this.Vehiculo_Temporada= new VehiculoTemporada().deserialize(input['Vehiculo_Temporada']);
        this.createdAt= new Date(input['createdAt']);
        this.updatedAt= new Date(input['updatedAt']);
        return this;
    }

    get horaFormato(): String {

        return (this.fecha && this.hora) ? new DatePipe('en-US').transform(this.fecha, 'shortDate')
            + '  ' + new DatePipe('en-US').transform(this.hora, 'shortTime')             
            : '-No hay horas-';
    }

   /* get vehiculo(){
        return `${this.Vehiculo_Temporada.Vehiculo.placa} - ${this.Vehiculo_Temporada.Vehiculo.modelo}`
    }

    get temporada(){
        return `${this.Vehiculo_Temporada.Temporada.anio} - ${this.Vehiculo_Temporada.Temporada.periodo}`
    }*/
}
