import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Temporada } from '../models/temporada';

@Injectable({
  providedIn: 'root'
})
export class TemporadaService {


  readonly URL_API = `${Variables.URL_SERVER}temporada`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getTemporadas() {
    return this.http.get<Temporada[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Temporada().deserialize(data)))
      );
  }

  getTemporada(id: number): Observable<Temporada> {
    return this.http.get<Temporada>(`${this.URL_API}/id/${id}`, { headers: this.headers })
      .pipe(
        map(data => new Temporada().deserialize(data))
      );
  }

  postTemporada(arreglo: Temporada) {
    return this.http.post<Temporada>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Temporada().deserialize(data))
      );
  }

  putTemporada(arreglo: Temporada) {
    return this.http.put<Temporada>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Temporada().deserialize(data))
      );
  }

  deleteTemporada(id: number) {
    return this.http.delete<Temporada>(`${this.URL_API}/delete/${id}`, { headers: this.headers })
      .pipe(
        map(data => new Temporada().deserialize(data))
      );
  }
}
