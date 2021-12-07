import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { PuntoEntrega } from '../models/punto-entrega';

@Injectable({
  providedIn: 'root'
})
export class PuntoEntregaService {


  readonly URL_API = `${Variables.URL_SERVER}punto_entrega`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getPuntoEntregas() {
    return this.http.get<PuntoEntrega[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PuntoEntrega().deserialize(data)))
      );
  }

  getPuntoEntrega(id: number): Observable<PuntoEntrega> {
    return this.http.get<PuntoEntrega>(`${this.URL_API}/id/${id}`, { headers: this.headers })
      .pipe(
        map(data => new PuntoEntrega().deserialize(data))
      );
  }

  postPuntoEntrega(arreglo: PuntoEntrega) {
    return this.http.post<PuntoEntrega>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PuntoEntrega().deserialize(data))
      );
  }

  putPuntoEntrega(arreglo: PuntoEntrega) {
    return this.http.put<PuntoEntrega>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PuntoEntrega().deserialize(data))
      );
  }

  deletePuntoEntrega(id: number) {
    return this.http.delete<PuntoEntrega>(`${this.URL_API}/delete/${id}`, { headers: this.headers })
      .pipe(
        map(data => new PuntoEntrega().deserialize(data))
      );
  }
}
