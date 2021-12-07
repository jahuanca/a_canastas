import { Deserializable } from "./deserializable";

export class Division implements Deserializable{
    iddivision:      number;
    detalledivision: string;
    idsociedad:      number;
    division:        string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
