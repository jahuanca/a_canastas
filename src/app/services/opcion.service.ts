import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Opcion } from '../models/opcion';

@Injectable({
  providedIn: 'root'
})
export class OpcionService {


  readonly URL_API = `${Variables.URL_SERVER}opcion`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getOpcionsCount() {
    return this.http.get<number>(`${this.URL_API}/count`, { headers: this.headers })
      .pipe(
        map(data => data)
      );
  }

  getOpcions() {
    return this.http.get<Opcion[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Opcion().deserialize(data)))
      );
  }

  getOpcionsByLimitAndOffset(limit: number, offset:number) {
    return this.http.get<Opcion[]>(`${this.URL_API}/range&limit=${limit}&offset=${offset}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Opcion().deserialize(data)))
      );
  }

  getOpcion(id: number): Observable<Opcion> {
    return this.http.get<Opcion>(`${this.URL_API}/id/${id}`, { headers: this.headers })
      .pipe(
        map(data => new Opcion().deserialize(data))
      );
  }

  postOpcion(arreglo: Opcion) {
    return this.http.post<Opcion>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Opcion().deserialize(data))
      );
  }

  putOpcion(arreglo: Opcion) {
    return this.http.put<Opcion>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Opcion().deserialize(data))
      );
  }

  deleteOpcion(id: number) {
    return this.http.delete<Opcion>(`${this.URL_API}/delete/${id}`, { headers: this.headers })
      .pipe(
        map(data => new Opcion().deserialize(data))
      );
  }
}
