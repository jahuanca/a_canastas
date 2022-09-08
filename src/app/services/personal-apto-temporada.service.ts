import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { PersonalAptoTemporada } from '../models/personal-apto-temporada';

@Injectable({
  providedIn: 'root'
})
export class PersonalAptoTemporadaService {


  readonly URL_API = `${Variables.URL_SERVER}personal_apto_temporada`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getPersonalAptoTemporadas() {
    return this.http.get<PersonalAptoTemporada[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PersonalAptoTemporada().deserialize(data)))
      );
  }

  getPersonalAptoTemporadasByIdTemporada(id:number) {
    return this.http.get<PersonalAptoTemporada[]>(`${this.URL_API}/id_temporada/${id}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PersonalAptoTemporada().deserialize(data)))
      );
  }

  getPersonalAptoTemporada(id: number): Observable<PersonalAptoTemporada> {
    return this.http.get<PersonalAptoTemporada>(`${this.URL_API}/id/${id}`, { headers: this.headers })
      .pipe(
        map(data => new PersonalAptoTemporada().deserialize(data))
      );
  }

  postPersonalAptoTemporada(objeto: PersonalAptoTemporada) {
    return this.http.post<PersonalAptoTemporada>(`${this.URL_API}/create`, objeto, { headers: this.headers })
      .pipe(
        map(data => new PersonalAptoTemporada().deserialize(data))
      );
  }

  createMany(arreglo: PersonalAptoTemporada[]) {
    return this.http.post<PersonalAptoTemporada[]>(`${this.URL_API}/createMany`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PersonalAptoTemporada().deserialize(data)))
      );
  }

  putPersonalAptoTemporada(arreglo: PersonalAptoTemporada) {
    return this.http.put<PersonalAptoTemporada>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PersonalAptoTemporada().deserialize(data))
      );
  }

  deletePersonalAptoTemporada(id: number) {
    return this.http.delete<PersonalAptoTemporada>(`${this.URL_API}/delete/${id}`, { headers: this.headers })
      .pipe(
        map(data => new PersonalAptoTemporada().deserialize(data))
      );
  }
}
