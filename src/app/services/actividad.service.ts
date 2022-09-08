import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Actividad } from '../models/actividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {


  readonly URL_API = `${Variables.URL_SERVER}actividad`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getActividads() {
    return this.http.get<Actividad[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Actividad().deserialize(data)))
      );
  }

  getActividad(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new Actividad().deserialize(data))
      );
  }

  postActividad(arreglo: number[]) {
    return this.http.post<Actividad[]>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Actividad().deserialize(data)))
      );
  }

  putActividad(arreglo: number[]) {
    return this.http.put<Actividad[]>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Actividad().deserialize(data)))
      );
  }

  deleteActividad(id: number) {
    return this.http.delete<Actividad[]>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Actividad().deserialize(data)))
      );
  }
}
