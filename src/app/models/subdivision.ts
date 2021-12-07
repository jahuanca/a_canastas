import { Deserializable } from "./deserializable";
import { Division } from "./division";

export class Subdivision implements Deserializable{
    idsubdivision:      number;
    detallesubdivision: string;
    iddivision:         number;
    subdivision:        string;
    Division:           Division;

    deserialize(input: any) {
        Object.assign(this, input);
        this.Division= new Division().deserialize(input['Division']);
        return this;
    }

    get nombreDivision(): String{
        return this.Division.detalledivision;
    }

}
