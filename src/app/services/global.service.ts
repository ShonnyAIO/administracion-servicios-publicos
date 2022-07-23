import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() {
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  private isMobileResolution: boolean;

  urlApi() {
    return environment.urlAPI;
  }

  session() {
    return String(localStorage.getItem('token'))
  }

  getApiKey() {
    return String(localStorage.getItem('api_key'));
  }

  logout() {
    return localStorage.clear();
  }

  getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }
}
