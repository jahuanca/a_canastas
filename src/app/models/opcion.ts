import { Deserializable } from "./deserializable";

export class Opcion implements Deserializable{
    id:          number;
    idusuario:   number;
    idpregunta:  number;
    opcion:      string;
    descripcion: string;
    observacion: string;
    estado:      string;
    createdAt:   Date;
    updatedAt:   Date;

    constructor(){}

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
