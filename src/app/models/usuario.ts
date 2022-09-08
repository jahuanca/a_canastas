import { Deserializable } from "./deserializable";

export class Usuario implements Deserializable {
    idusuario:        number;
    idtipodocumento:  number;
    alias:            string;
    password:         string;
    apellidosnombres: string;
    nrodocumento:     string;
    email:            string;
    area:             string;
    activo:           number;
    fechamod:         Date;
    token:            string;
    //Usuario_Perfils:  UsuarioPerfil[];

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        //this.Objeto = new Objeto().deserialize(input['Objeto']);
        return this;
    }

}