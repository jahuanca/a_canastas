import { Deserializable } from "./deserializable";

export class Temporada implements Deserializable{

    id: number;
    idproducto: number;
    anio: string;
    descripcion: string;
    fechainicio: Date;
    fechafin: Date;
    periodo: string;
    createdAt: Date;
    updatedAt: Date;

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        this.createdAt= new Date(input['createdAt']);
        this.updatedAt= new Date(input['updatedAt']);
        return this;
    }
}
