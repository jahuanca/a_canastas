import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {


  readonly URL_API = `${Variables.URL_SERVER}vehiculo`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getVehiculos() {
    return this.http.get<Vehiculo[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Vehiculo().deserialize(data)))
      );
  }

  getVehiculo(id: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.URL_API}/id/${id}`, { headers: this.headers })
      .pipe(
        map(data => new Vehiculo().deserialize(data))
      );
  }

  postVehiculo(arreglo: Vehiculo) {
    return this.http.post<Vehiculo>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Vehiculo().deserialize(data))
      );
  }

  putVehiculo(arreglo: Vehiculo) {
    return this.http.put<Vehiculo>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Vehiculo().deserialize(data))
      );
  }

  deleteVehiculo(id: number) {
    return this.http.delete<Vehiculo>(`${this.URL_API}/delete/${id}`, { headers: this.headers })
      .pipe(
        map(data => new Vehiculo().deserialize(data))
      );
  }
}
