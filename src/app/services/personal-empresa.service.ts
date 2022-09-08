import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { PersonalEmpresa } from '../models/personal-empresa';

@Injectable({
  providedIn: 'root'
})
export class PersonalEmpresaService {


  readonly URL_API = `${Variables.URL_SERVER}personal_empresa`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getPersonalEmpresas() {
    return this.http.get<PersonalEmpresa[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PersonalEmpresa().deserialize(data)))
      );
  }

  getPersonalEmpresasBloqueado() {
    return this.http.get<PersonalEmpresa[]>(`${this.URL_API}/bloqueado`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PersonalEmpresa().deserialize(data)))
      );
  }

  getPersonalEmpresa(id: number): Observable<PersonalEmpresa> {
    return this.http.get<PersonalEmpresa>(`${this.URL_API}/id/${id}`, { headers: this.headers })
      .pipe(
        map(data => new PersonalEmpresa().deserialize(data))
      );
  }

  postPersonalEmpresa(arreglo: PersonalEmpresa) {
    return this.http.post<PersonalEmpresa>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PersonalEmpresa().deserialize(data))
      );
  }

  putPersonalEmpresa(arreglo: PersonalEmpresa) {
    return this.http.put<PersonalEmpresa>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PersonalEmpresa().deserialize(data))
      );
  }

  deletePersonalEmpresa(id: number) {
    return this.http.delete<PersonalEmpresa>(`${this.URL_API}/delete/${id}`, { headers: this.headers })
      .pipe(
        map(data => new PersonalEmpresa().deserialize(data))
      );
  }
}
