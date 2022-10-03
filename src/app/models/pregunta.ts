import { Deserializable } from "./deserializable";
import { Opcion } from "./opcion";

export class Pregunta implements Deserializable{

    id:                   number;
    idusuario:            number;
    idencuesta:           number;
    idtipopregunta:       number;
    pregunta:             string;
    descripcion:          string;
    observacion:          string;
    estado:               string;
    permitirOpcionManual: boolean;
    createdAt:            Date;
    updatedAt:            Date;
    Opcions:              Opcion[];


    deserialize(input: any) {
        Object.assign(this, input);
        if(input['Opcions']){
            this.Opcions=[];
            for (let í = 0; í < input['Opcions'].length; í++) {
                const element = input['Opcions'][í];
                this.Opcions.push(
                    new Opcion().deserialize(element)
                );
            }
        }

        this.updatedAt= new Date(input['updatedAt']);
        return this;
    }
}
