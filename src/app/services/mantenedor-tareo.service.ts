import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { MantenedorTareo } from '../models/mantenedor-tareo';

@Injectable({
  providedIn: 'root'
})
export class MantenedorTareoService {


  readonly URL_API = `${Variables.URL_SERVER}mantenedor_tareo`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getMantenedorTareos() {
    return this.http.get<MantenedorTareo[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new MantenedorTareo().deserialize(data)))
      );
  }

  getMantenedorTareo(id: number): Observable<MantenedorTareo> {
    return this.http.get<MantenedorTareo>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new MantenedorTareo().deserialize(data))
      );
  }

  postMantenedorTareo(arreglo: MantenedorTareo) {
    return this.http.post<MantenedorTareo>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new MantenedorTareo().deserialize(data))
      );
  }

  putMantenedorTareo(arreglo: MantenedorTareo) {
    return this.http.put<MantenedorTareo>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new MantenedorTareo().deserialize(data))
      );
  }

  deleteMantenedorTareo(id: number) {
    return this.http.delete<MantenedorTareo>(`${this.URL_API}/delete/id`, { headers: this.headers })
      .pipe(
        map(data => new MantenedorTareo().deserialize(data))
      );
  }
}
