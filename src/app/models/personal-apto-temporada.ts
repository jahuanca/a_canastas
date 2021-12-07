import { Deserializable } from "./deserializable";
import { PersonalEmpresa } from "./personal-empresa";

export class PersonalAptoTemporada implements Deserializable {
    id: number;
    idtemporada: number;
    idusuario: number;
    codigosap: string;
    idestado: number;
    Personal_Empresa: PersonalEmpresa;
    createdAt: Date;
    updatedAt: Date;

    constructor() {

    }

    deserialize(input: any) {
        Object.assign(this, input);
        this.Personal_Empresa = new PersonalEmpresa().deserialize(input['Personal_Empresa']);
        this.createdAt= new Date(input['createdAt']);
        this.updatedAt= new Date(input['updatedAt']);
        return this;
    }

    get nombrePersonal() {
        return `${this.Personal_Empresa.nombreCompleto}`;
    }

}
