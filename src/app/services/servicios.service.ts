import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private global: GlobalService, private http: HttpClient) { }

  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.global.session(), 'api_key': this.global.getApiKey() });

  urlApi: string = this.global.urlApi();


  getUsersServices(body: any) {
    return this.http.post(`${this.urlApi}/publicos/obtener-servicios`, body, { headers: this.headers });
  }

  postCantv(body: any) {
    console.log(body);
    return this.http.post(`${this.urlApi}/publicos/cantv`, body, { headers: this.headers });
  }

  postCorpoelec(body: any) {
    return this.http.post(`${this.urlApi}/publicos/corpoelec`, body, { headers: this.headers });
  }

  postLogin(body: any) {
    return this.http.post(`${this.urlApi}/auth/login`, body, { headers: this.headers });
  }

}
