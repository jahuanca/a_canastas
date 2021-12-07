import { DatePipe } from "@angular/common";
import { Deserializable } from "./deserializable";
export class Registro implements Deserializable{
    idtemporada:     number;
    apellidopaterno: string;
    apellidomaterno: string;
    nombres:         string;
    puntoentrega:    string;
    placa:           string;
    anio:            string;
    periodo:         string;
    fechainicio:     Date;
    fechafin:        Date;
    id:              number;
    codigosap:       string;
    nrodocumento:       string;
    fecha:           Date;
    hora:            Date;
    apto:            boolean;    

    constructor(){}

    deserialize(input: any) {
        Object.assign(this, input);
        this.fecha= new Date(input['fecha']);
        this.hora= new Date(input['hora']);
        this.fechainicio= new Date(input['fechainicio']);
        this.fechafin= new Date(input['fechafin']);
        return this;
    }

    get nombreTemporada(){
        return `${this.anio} ${this.periodo}`;
    }

    get horaFormato(): String {
        return (this.fecha && this.hora) ? new DatePipe('en-US').transform(this.fecha, 'shortDate')
            + '  ' + new DatePipe('en-US').transform(this.hora, 'shortTime')             
            : '-No hay horas-';
    }

    get duracion(): String {
        return new DatePipe('en-US').transform(this.fechainicio, 'shortDate')+ ' - ' + new DatePipe('en-US').transform(this.fechafin, 'shortDate');
    }

    get nombrePersonal(){
        return `${this.apellidopaterno} ${this.apellidomaterno}, ${this.nombres}`;
    }
}
