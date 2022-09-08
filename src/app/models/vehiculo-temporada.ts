import { Deserializable } from "./deserializable";
import { Temporada } from "./temporada";
import { Vehiculo } from "./vehiculo";

export class VehiculoTemporada implements Deserializable{

    id: number;
    idtemporada: number;
    idusuario: number;
    placa: string;
    fecha: Date;
    hora: Date;
    Temporada: Temporada;
    Vehiculo: Vehiculo;

    constructor(){

    }

    deserialize(input: any) {
        Object.assign(this, input);
        this.Vehiculo= new Vehiculo().deserialize(input['Vehiculo']);
        this.Temporada= new Temporada().deserialize(input['Temporada']);
        return this;
    }
}
