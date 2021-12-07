import { Deserializable } from "./deserializable";

export class Producto implements Deserializable{
    id: number;
    descripcion: string;
    unidad: string;
    fechamod: Date;
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
