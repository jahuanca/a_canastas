import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {


  readonly URL_API = `${Variables.URL_SERVER}pregunta`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getPreguntasCount() {
    return this.http.get<number>(`${this.URL_API}/count`, { headers: this.headers })
      .pipe(
        map(data => data)
      );
  }

  getPreguntas() {
    return this.http.get<Pregunta[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Pregunta().deserialize(data)))
      );
  }

  getPreguntasByIdEncuesta(id:number) {
    return this.http.get<Pregunta[]>(`${this.URL_API}/id_encuesta/${id}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Pregunta().deserialize(data)))
      );
  }

  getPreguntasByLimitAndOffset(limit: number, offset:number) {
    return this.http.get<Pregunta[]>(`${this.URL_API}/range&limit=${limit}&offset=${offset}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Pregunta().deserialize(data)))
      );
  }

  getPregunta(id: number): Observable<Pregunta> {
    return this.http.get<Pregunta>(`${this.URL_API}/id/${id}`, { headers: this.headers })
      .pipe(
        map(data => new Pregunta().deserialize(data))
      );
  }

  postPregunta(arreglo: Pregunta) {
    return this.http.post<Pregunta>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Pregunta().deserialize(data))
      );
  }

  putPregunta(arreglo: Pregunta) {
    return this.http.put<Pregunta>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Pregunta().deserialize(data))
      );
  }

  deletePregunta(id: number) {
    return this.http.delete<Pregunta>(`${this.URL_API}/delete/${id}`, { headers: this.headers })
      .pipe(
        map(data => new Pregunta().deserialize(data))
      );
  }
}
