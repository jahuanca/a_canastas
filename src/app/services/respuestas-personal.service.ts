import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { RespuestasPersonal } from '../models/respuestas-personal';
import { RegistroRespuesta } from '../models/registrorespuesta';

@Injectable({
  providedIn: 'root'
})
export class RespuestasPersonalService {


  readonly URL_API = `${Variables.URL_SERVER}v_respuestaspersonal`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getRespuestasPersonal() {
    return this.http.get<RespuestasPersonal[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new RespuestasPersonal().deserialize(data)))
      );
  }

  getRespuestaPersonal(id: number): Observable<RespuestasPersonal> {
    return this.http.get<RespuestasPersonal>(`${this.URL_API}/id/${id}`, { headers: this.headers })
      .pipe(
        map(data => new RespuestasPersonal().deserialize(data))
      );
  }

  /*postPersonalVehiculo(arreglo: PersonalVehiculo) {
    return this.http.post<PersonalVehiculo>(`${this.URL_API}/create`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new PersonalVehiculo().deserialize(data))
      );
  }*/

  byRange(arreglo: {inicio:Date, fin: Date, idsubdivision: number, idencuesta: number}) {
    return this.http.post<RegistroRespuesta[]>(`${this.URL_API}/range`, arreglo, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new RegistroRespuesta().deserialize(data)))
      );
  }

  putRespuestasPersonal(arreglo: RespuestasPersonal) {
    return this.http.put<RespuestasPersonal>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new RespuestasPersonal().deserialize(data))
      );
  }

  deleteRespuestasPersonal(id: number) {
    return this.http.delete<RespuestasPersonal>(`${this.URL_API}/delete/${id}`, { headers: this.headers })
      .pipe(
        map(data => new RespuestasPersonal().deserialize(data))
      );
  }
}
