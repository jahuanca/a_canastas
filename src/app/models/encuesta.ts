import { DatePipe } from "@angular/common";
import { Deserializable } from "./deserializable";

export class Encuesta implements Deserializable{

    id: number;
    idusuario: number;
    idtipoencuesta: number;
    periodo: string;
    fechaInicio: Date;
    fechaFin: Date;
    anio: string;
    titulo: string;
    descripcion: string;
    observacion: string;
    estado: string;
    createdAt: Date;
    updatedAt: Date;

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        this.createdAt= new Date(input['createdAt']);
        this.updatedAt= new Date(input['updatedAt']);
        return this;
    }

    get nombre():String{
        return `${this.anio}-${this.periodo}`;
    }

    get rango():String{
        return `${new DatePipe('en-US').transform(this.fechaInicio, 'dd/MM/yy')} - ${new DatePipe('en-US').transform(this.fechaFin, 'dd/MM/yy')}`;
    }
}
