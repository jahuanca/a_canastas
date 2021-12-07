import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { PersonalVehiculo } from '../models/personal-vehiculo';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class PersonalVehiculoService {


  readonly URL_API = `${Variables.URL_SERVER}personal_vehiculo`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getPersonalVehiculos() {
    return this.http.get<PersonalVehiculo[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new PersonalVehiculo().deserialize(data)))
      );
  }

  getPersonalVehiculo(id: number): Observable<PersonalVehiculo> {
    return this.http.get<PersonalVehiculo>(`${this.URL_API}/id/${id}`, { headers: this.headers })
      .pipe(
        map(data => new PersonalVehiculo().deserialize(data))
      );
  }

  postPersonalVehiculo(arreglo: PersonalVehiculo) {
    return this.http.post<PersonalVehiculo>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PersonalVehiculo().deserialize(data))
      );
  }

  byRange(arreglo: {inicio:Date, fin: Date, idpuntoentrega: number}) {
    return this.http.post<Registro[]>(`${this.URL_API}/range`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Registro().deserialize(data)))
      );
  }

  putPersonalVehiculo(arreglo: PersonalVehiculo) {
    return this.http.put<PersonalVehiculo>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PersonalVehiculo().deserialize(data))
      );
  }

  deletePersonalVehiculo(id: number) {
    return this.http.delete<PersonalVehiculo>(`${this.URL_API}/delete/${id}`, { headers: this.headers })
      .pipe(
        map(data => new PersonalVehiculo().deserialize(data))
      );
  }
}
