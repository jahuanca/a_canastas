import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from '../models/variables';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  readonly URL_API = `${Variables.URL_SERVER}producto`
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    //this.headers=this.headers.append('Authorization', 'Bearer '+localStorage.getItem("tokenSumate2020"));
  }

  getProductos() {
    return this.http.get<Producto[]>(`${this.URL_API}`, { headers: this.headers })
      .pipe(
        map(data => data.map(data => new Producto().deserialize(data)))
      );
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.URL_API}/id/id`, { headers: this.headers })
      .pipe(
        map(data => new Producto().deserialize(data))
      );
  }

  postProducto(objeto: Producto) {
    return this.http.post<Producto>(`${this.URL_API}/create`, objeto, { headers: this.headers })
      .pipe(
        map(data => new Producto().deserialize(data))
      );
  }

  putProducto(arreglo: Producto) {
    return this.http.put<Producto>(`${this.URL_API}/update`, arreglo, { headers: this.headers })
      .pipe(
        map(data => new Producto().deserialize(data))
      );
  }

  deleteProducto(id: number) {
    return this.http.delete<Producto>(`${this.URL_API}/delete/${id}`, { headers: this.headers })
      .pipe(
        map(data => new Producto().deserialize(data))
      );
  }
}
