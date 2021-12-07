import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Auth } from '../models/auth';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  readonly URL_API = `${Variables.URL_SERVER}auth`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getAuths() {
    return this.http.get<Auth[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Auth().deserialize(data)))
      );
  }

  getAuth(id: number): Observable<Auth> {
    return this.http.get<Auth>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new Auth().deserialize(data))
      );
  }

  postAuth(arreglo: Auth) {
    return this.http.post<Auth>(`${this.URL_API}/signIn`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Usuario().deserialize(data))
      );
  }

  putAuth(arreglo: Auth) {
    return this.http.put<Auth[]>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Auth().deserialize(data)))
      );
  }

  deleteAuth(id: number) {
    return this.http.delete<Auth[]>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Auth().deserialize(data)))
      );
  }
}
