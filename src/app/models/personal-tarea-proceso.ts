import { DatePipe } from "@angular/common";
import { Deserializable } from "./deserializable";

export class PersonalTareaProceso implements Deserializable {

    item: number;
    itemtareoproceso: number;
    codigoempresa: string;
    transferidosap: boolean;
    horainicio: Date;
    horafin: Date;
    pausainicio: Date | null;
    pausafin: Date | null;
    fechafin: Date | null;
    fechainicio: Date | null;
    turno: null | string;
    diasiguiente: boolean | null;
    esrendimiento: boolean | null;
    esjornal: boolean | null;
    fechamod: Date;
    cantidadhoras: number;
    cantidadrendimiento: number;
    cantidadavance: number;
    idestado: number;
    idusuario: number;
    idactividad: number;

    pipe = new DatePipe('en-US');

    constructor() {

    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    get horaFormato(): String {

        return (this.horainicio && this.horafin) ? this.pipe.transform(this.horainicio, 'shortDate')
            + '  ' + this.pipe.transform(this.horainicio, 'shortTime') + ' - '
            + '  ' + this.pipe.transform(this.horafin, 'shortTime')
            : '-No hay horas-';
    }

    get pausaFormato(): String {

        return (this.pausainicio && this.pausafin) ? this.pipe.transform(this.pausainicio, 'shortTime') + ' - '
            + '  ' + this.pipe.transform(this.pausafin, 'shortTime')
            : '-No hay pausas-';
    }
}
