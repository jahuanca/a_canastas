import { Deserializable } from "./deserializable";

export class Auth implements Deserializable{
    alias: String;
    password: String;
    idsubdivision: number=7;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}
