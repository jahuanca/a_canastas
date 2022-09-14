import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { EncuestaOpcion } from '../models/encuesta-opcion';

@Injectable({
  providedIn: 'root'
})
export class EncuestaOpcionService {


  readonly URL_API = `${Variables.URL_SERVER}encuesta_opciones`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getEncuestaOpcionsCount() {
    return this.http.get<number>(`${this.URL_API}/count`, { headers: this.headers })
      .pipe(
        map(data => data)
      );
  }

  getEncuestaOpcions() {
    return this.http.get<EncuestaOpcion[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new EncuestaOpcion().deserialize(data)))
      );
  }

  getEncuestaOpcionsByIdEncuesta(idEncuesta:number) {
    return this.http.get<EncuestaOpcion[]>(`${this.URL_API}/id_encuesta/${idEncuesta}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new EncuestaOpcion().deserialize(data)))
      );
  }

  getEncuestaOpcionsByLimitAndOffset(limit: number, offset:number) {
    return this.http.get<EncuestaOpcion[]>(`${this.URL_API}/range&limit=limit&offset=offset`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new EncuestaOpcion().deserialize(data)))
      );
  }

  getEncuestaOpcion(id: number): Observable<EncuestaOpcion> {
    return this.http.get<EncuestaOpcion>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new EncuestaOpcion().deserialize(data))
      );
  }

  postEncuestaOpcion(arreglo: EncuestaOpcion) {
    return this.http.post<EncuestaOpcion>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new EncuestaOpcion().deserialize(data))
      );
  }

  putEncuestaOpcion(arreglo: EncuestaOpcion) {
    return this.http.put<EncuestaOpcion>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new EncuestaOpcion().deserialize(data))
      );
  }

  deleteEncuestaOpcion(id: number) {
    return this.http.delete<EncuestaOpcion>(`${this.URL_API}/delete/${id}`, { headers: this.headers })
      .pipe(
        map(data => new EncuestaOpcion().deserialize(data))
      );
  }
}
