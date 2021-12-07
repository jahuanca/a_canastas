import { Deserializable } from "./deserializable";

export class PuntoEntrega implements Deserializable{
    id: number;
    nombre: string;
    descripcion: string;
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
