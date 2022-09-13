import { Deserializable } from "./deserializable";
export class EncuestaOpcion implements Deserializable {

    id:number;
    idencuesta: number;
    idusuario: number;
    opcion: string;
    descripcion: string;
    observacion: string;
    estado: string;

    createdAt: Date;
    updatedAt: Date;

    constructor(init?:Partial<EncuestaOpcion>) {
        Object.assign(this, init);
    }

    deserialize(input: any) {
        Object.assign(this, input);
        /* if(input['createdAt'] != null) this.createdAt = new Date(input['createdAt']);
        if(input['updatedAt'] != null) this.updatedAt = new Date(input['updatedAt']); */
        return this;
    }

    toString(){
        return `${this.opcion ?? '---' }`;
    }

}
