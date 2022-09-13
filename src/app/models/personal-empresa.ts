import { Deserializable } from "./deserializable";

export class PersonalEmpresa implements Deserializable{

    codigoempresa:     string;
    apellidopaterno:   string;
    apellidomaterno:   string;
    nombres:           string;
    nrodocumento:      string;
    fechamod:          Date;
    idtipodocumento:   number;
    fechaingreso:      Date;
    bloqueado:         boolean;
    fechacese:         Date;
    idusuario:         number;
    itemgrupopersonal: number;

    constructor() {

    }

    deserialize(input: any) {
        Object.assign(this, input);
        
        return this;
    }

    get apellidos(): string{
        return `${this.apellidopaterno?.trim()} ${this.apellidomaterno?.trim()}`;
    }

    get nombreCompleto(): string{
        return `${this.apellidos}, ${this.apellidomaterno?.trim()}`;
    }

    toString(){
        return `${this.apellidos.toString()}, ${this.apellidomaterno?.trim()}`;
    }
}
