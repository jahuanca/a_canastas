import { Deserializable } from "./deserializable";

export class Actividad implements Deserializable{
    idactividad:   number;
    actividad:     string;
    descripcion:   string;
    activo:        boolean;
    esrendimiento: boolean;
    esjornal:      boolean;
    idsociedad:    number;
    idusuario:     number;
    fechamod:      Date;

    constructor(){}
    
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    get rendimiento() : String {
        return (this.esrendimiento) ? 'Rendimiento' : (this.esjornal) ? 'Jornal' : '-No registrado-';
    }

}
