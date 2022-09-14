
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { EncuestaDetalle } from '../models/encuesta-detalle';

@Injectable({
  providedIn: 'root'
})
export class EncuestaDetalleService {


  readonly URL_API = `${Variables.URL_SERVER}encuesta_detalle`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getEncuestaDetallesCount() {
    return this.http.get<number>(`${this.URL_API}/count`, { headers: this.headers })
      .pipe(
        map(data => data)
      );
  }

  getEncuestaDetalles() {
    return this.http.get<EncuestaDetalle[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new EncuestaDetalle().deserialize(data)))
      );
  }

  getEncuestaDetallesByIdEncuesta(id:number) {
    return this.http.get<EncuestaDetalle[]>(`${this.URL_API}/id_encuesta/${id}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new EncuestaDetalle().deserialize(data)))
      );
  }

  postEncuestasDetallesByIdEncuestaAndRange(id:number, inicio: Date, fin:Date) {
    return this.http.post<EncuestaDetalle[]>(`${this.URL_API}/rangeDate`,
        {
          'id': id,
          'inicio': inicio,
          'fin': fin
        }
      , { headers: this.headers })
      .pipe(
        map(data => data.map(data => new EncuestaDetalle().deserialize(data)))
      );
  }

  getEncuestaDetallesByLimitAndOffset(limit: number, offset:number) {
    return this.http.get<EncuestaDetalle[]>(`${this.URL_API}/range&limit=limit&offset=offset`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new EncuestaDetalle().deserialize(data)))
      );
  }

  getEncuestaDetalle(id: number): Observable<EncuestaDetalle> {
    return this.http.get<EncuestaDetalle>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new EncuestaDetalle().deserialize(data))
      );
  }

  postEncuestaDetalle(arreglo: EncuestaDetalle) {
    return this.http.post<EncuestaDetalle>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new EncuestaDetalle().deserialize(data))
      );
  }

  putEncuestaDetalle(arreglo: EncuestaDetalle) {
    return this.http.put<EncuestaDetalle>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new EncuestaDetalle().deserialize(data))
      );
  }

  deleteEncuestaDetalle(id: number) {
    return this.http.delete<EncuestaDetalle>(`${this.URL_API}/delete/${id}`, { headers: this.headers })
      .pipe(
        map(data => new EncuestaDetalle().deserialize(data))
      );
  }
}
