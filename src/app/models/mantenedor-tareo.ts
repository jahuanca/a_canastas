import { Deserializable } from "./deserializable";

export class MantenedorTareo implements Deserializable {
    idmantenedor:      number;
    detallemantenedor: string;
    fechamod:          Date;

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}