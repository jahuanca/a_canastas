import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Encuesta } from '../models/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {


  readonly URL_API = `${Variables.URL_SERVER}encuesta`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getEncuestasCount() {
    return this.http.get<number>(`${this.URL_API}/count`, { headers: this.headers })
      .pipe(
        map(data => data)
      );
  }

  getEncuestas() {
    return this.http.get<Encuesta[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Encuesta().deserialize(data)))
      );
  }

  getEncuestasByLimitAndOffset(limit: number, offset:number) {
    return this.http.get<Encuesta[]>(`${this.URL_API}/range&limit=${limit}&offset=${offset}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Encuesta().deserialize(data)))
      );
  }

  getEncuesta(id: number): Observable<Encuesta> {
    return this.http.get<Encuesta>(`${this.URL_API}/id/${id}`, { headers: this.headers })
      .pipe(
        map(data => new Encuesta().deserialize(data))
      );
  }

  getReporte(id: number): Observable<any> {
    return this.http.get<Encuesta>(`${this.URL_API}/report/${id}`, { headers: this.headers })
      .pipe(
        map(data => data)
      );
  }

  postEncuesta(arreglo: Encuesta) {
    return this.http.post<Encuesta>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Encuesta().deserialize(data))
      );
  }

  putEncuesta(arreglo: Encuesta) {
    return this.http.put<Encuesta>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Encuesta().deserialize(data))
      );
  }

  deleteEncuesta(id: number) {
    return this.http.delete<Encuesta>(`${this.URL_API}/delete/${id}`, { headers: this.headers })
      .pipe(
        map(data => new Encuesta().deserialize(data))
      );
  }
}
