import { Deserializable } from "./deserializable";

export class Vehiculo implements Deserializable{

    id: number;
    placa: string;
    modelo: string;
    estado: string;
    createdAt: Date;
    updatedAt:Date;

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        this.createdAt= new Date(input['createdAt']);
        this.updatedAt= new Date(input['updatedAt']);
        return this;
    }
}
