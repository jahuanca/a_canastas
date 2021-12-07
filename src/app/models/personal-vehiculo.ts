
import { Deserializable } from "./deserializable";
import { PersonalEmpresa } from "./personal-empresa";
import { DatePipe } from "@angular/common";
import { PuntoEntrega } from "./punto-entrega";
import { VehiculoTemporada } from "./vehiculo-temporada";

export class PersonalVehiculo implements Deserializable{

    id: number;
    idpuntoentrega: number;
    idvehiculotemporada: number;
    idusuario: number;
    codigosap: string;
    fecha: Date;
    hora: Date;
    apto: true;
    Punto_Entrega: PuntoEntrega;
    Personal_Empresa: PersonalEmpresa;
    Vehiculo_Temporada: VehiculoTemporada;
    createdAt: Date;
    updatedAt: Date;

    constructor() {

    }

    deserialize(input: any) {
        Object.assign(this, input);
        this.Punto_Entrega= new PuntoEntrega().deserialize(input['Punto_Entrega']);
        this.Personal_Empresa= new PersonalEmpresa().deserialize(input['Personal_Empresa']);
        this.Vehiculo_Temporada= new VehiculoTemporada().deserialize(input['Vehiculo_Temporada']);
        this.createdAt= new Date(input['createdAt']);
        this.updatedAt= new Date(input['updatedAt']);
        return this;
    }

    get horaFormato(): String {

        return (this.fecha && this.hora) ? new DatePipe('en-US').transform(this.fecha, 'shortDate')
            + '  ' + new DatePipe('en-US').transform(this.hora, 'shortTime')             
            : '-No hay horas-';
    }

    get vehiculo(){
        return `${this.Vehiculo_Temporada.Vehiculo.placa} - ${this.Vehiculo_Temporada.Vehiculo.modelo}`
    }

    get temporada(){
        return `${this.Vehiculo_Temporada.Temporada.anio} - ${this.Vehiculo_Temporada.Temporada.periodo}`
    }
}
