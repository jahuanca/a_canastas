import { Actividad } from "./actividad";
import { Deserializable } from "./deserializable";

export class Labor implements Deserializable{
    idlabor:     number;
    idactividad: number;
    labor:       string;
    descripcion: string;
    activo:      boolean;
    idusuario:   number;
    fechamod:    Date;
    Actividad:   Actividad;

    constructor(){}
    
    deserialize(input: any) {
        Object.assign(this, input);
        this.Actividad= new Actividad().deserialize(input['Actividad']);
        return this;
    }

    get nombreActividad(): String{
        return this.Actividad.descripcion;
    }
}

