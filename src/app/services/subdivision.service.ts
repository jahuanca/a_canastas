import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Subdivision } from '../models/subdivision';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionService {


  readonly URL_API = `${Variables.URL_SERVER}subdivision`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getSubdivisions() {
    return this.http.get<Subdivision[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Subdivision().deserialize(data)))
      );
  }

  getSubdivision(id: number): Observable<Subdivision> {
    return this.http.get<Subdivision>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new Subdivision().deserialize(data))
      );
  }

  postSubdivision(arreglo: number[]) {
    return this.http.post<Subdivision[]>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Subdivision().deserialize(data)))
      );
  }

  putSubdivision(arreglo: number[]) {
    return this.http.put<Subdivision[]>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Subdivision().deserialize(data)))
      );
  }

  deleteSubdivision(id: number) {
    return this.http.delete<Subdivision[]>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Subdivision().deserialize(data)))
      );
  }
}
