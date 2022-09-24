import { DatePipe } from "@angular/common";
import { Deserializable } from "./deserializable";
export class RegistroRespuesta implements Deserializable{
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
    idunidad: number;
    idetapa: number;
    idcampo:number;
    idturno:number;
    createdAt: Date;
    updatedAt: Date;

    constructor(){}

    deserialize(input: any) {
        Object.assign(this, input);
        this.hora=new Date(input['hora']);
        this.hora.setTime(this.hora.getTime() + (5*60*60*1000));
        /* this.hora= new DatePipe('en-US').transform(input['hora'], 'shortTime'); */
        /* this.fecha= new DatePipe('en-US').transform(input['fecha'], 'shortDate'); */
        /* this.fechainicio= new Date(input['fechainicio']);
        this.fechafin= new Date(input['fechafin']); */
        return this;
    }

    /*get nombreTemporada(){
        return `${this.anio} ${this.periodo}`;
    }*/

    get horaFormato(): String {
        return (this.fecha && this.hora) ? this.fecha
            + '  ' + new DatePipe('en-US').transform(this.hora, 'shortTime')
            : '-No hay horas-';
    }

    /* get duracion(): String {
        return new DatePipe('en-US').transform(this.fechainicio, 'shortDate')+ ' - ' + new DatePipe('en-US').transform(this.fechafin, 'shortDate');
    } */

    /*get nombrePersonal(){
        return `${this.apellidopaterno} ${this.apellidomaterno}, ${this.nombres}`;
    }*/
}
