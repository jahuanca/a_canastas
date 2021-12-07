import { Observable } from "rxjs";
import { PersonalTareaProceso } from "../personal-tarea-proceso";

export abstract class PersonalTareaProcesoGateway {
    abstract getAll(): Observable<PersonalTareaProceso>;
    abstract getByRange(): Observable<PersonalTareaProceso>;

}
