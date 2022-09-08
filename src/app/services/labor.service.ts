import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Labor } from '../models/labor';

@Injectable({
  providedIn: 'root'
})
export class LaborService {


  readonly URL_API = `${Variables.URL_SERVER}labor`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getLabors() {
    return this.http.get<Labor[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Labor().deserialize(data)))
      );
  }

  getLabor(id: number): Observable<Labor> {
    return this.http.get<Labor>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new Labor().deserialize(data))
      );
  }

  postLabor(arreglo: number[]) {
    return this.http.post<Labor[]>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Labor().deserialize(data)))
      );
  }

  putLabor(arreglo: number[]) {
    return this.http.put<Labor[]>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Labor().deserialize(data)))
      );
  }

  deleteLabor(id: number) {
    return this.http.delete<Labor[]>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Labor().deserialize(data)))
      );
  }
}
