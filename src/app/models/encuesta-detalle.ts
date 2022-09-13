import { Deserializable } from "./deserializable";
import { EncuestaOpcion } from "./encuesta-opcion";
import { PersonalEmpresa } from "./personal-empresa";

export class EncuestaDetalle implements Deserializable {
    idsubdivision: number;
    idusuario: number;
    idencuesta: number;
    idopcionencuesta: number;
    codigoempresa: string;
    opcionmanual: string;
    fecha: Date;
    hora: Date;
    createdAt: Date;
    updatedAt: Date;
    Personal_Empresa: PersonalEmpresa;
    EncuestaOpcion: EncuestaOpcion;

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        this.hora = new Date(input['hora']);
        if(input['createdAt']) this.createdAt = new Date(input['createdAt']);
        if(input['updatedAt']) this.updatedAt = new Date(input['updatedAt']);

        this.Personal_Empresa = new PersonalEmpresa().deserialize(input['Personal_Empresa']);
        this.EncuestaOpcion = new EncuestaOpcion().deserialize(input['EncuestaOpcion']);
        return this;
    }

}
