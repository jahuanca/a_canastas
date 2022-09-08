import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { PersonalTareaProceso } from '../models/personal-tarea-proceso';

@Injectable({
  providedIn: 'root'
})
export class PersonalTareaProcesoService {


  readonly URL_API = `${Variables.URL_SERVER}personal_tarea_proceso`
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getPersonalTareaProcesos() {
    return this.http.get<PersonalTareaProceso[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PersonalTareaProceso().deserialize(data)))
      );
  }

  getPersonalTareaProceso(id: number): Observable<PersonalTareaProceso> {
    return this.http.get<PersonalTareaProceso>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new PersonalTareaProceso().deserialize(data))
      );
  }

  postPersonalTareaProceso(arreglo: number[]) {
    return this.http.post<PersonalTareaProceso[]>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PersonalTareaProceso().deserialize(data)))
      );
  }

  putPersonalTareaProceso(arreglo: number[]) {
    return this.http.put<PersonalTareaProceso[]>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PersonalTareaProceso().deserialize(data)))
      );
  }

  deletePersonalTareaProceso(id: number) {
    return this.http.delete<PersonalTareaProceso[]>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PersonalTareaProceso().deserialize(data)))
      );
  }

  byRango(id: number): Observable<PersonalTareaProceso[]> {
    return this.http.get<PersonalTareaProceso[]>(`${this.URL_API}/rango`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PersonalTareaProceso().deserialize(data)))
      );
  }
}
