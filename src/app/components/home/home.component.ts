import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: ServiciosService) { }

  services = {
    cantv: '',
    corpoelec: '',
    condominio: '',
    fecha_corte: ''
  };

  servicesUser: any = {};


  getCantv() {
    console.log('Consultando CANTV...');
    this.services.cantv = 'Consultando...';
    this.userService.postCantv({ data: this.servicesUser.phone }).subscribe((resp: any) => {
      console.log(resp.saldo);
      this.services.cantv = resp.saldo.saldoActual + ' Bs. S';
      this.services.fecha_corte = this.orderDate(resp.saldo.fechaVencimiento);
    })
  }

  getCorpoelec() {
    console.log('Consultando Corpoelec...');
    this.services.corpoelec = 'Consultando ...';
    this.userService.postCorpoelec({ ncc: this.servicesUser.corpoelec }).subscribe((resp: any) => {
      console.log(resp);
      this.services.corpoelec = resp.total_a_pagar + ' Bs. S';
    })
  }

  getCondominio() {
    console.log('Consultanto su condominio...')
    this.services.condominio = 'Consultando ...';
    this.services.condominio = '53.00 Bs.S';
  }

  orderDate(date: any) {
    let day = date.slice(date.length - 2);
    let month = date.slice(date.length - 4, date.length - 2);
    let year = date.slice(0, date.length - 4);
    return `${day}/${month}/${year}`;
  }

  ngOnInit(): void {
    this.userService.getUsersServices({ id: localStorage.getItem('user_id') }).subscribe((response: any) => {
      console.log(response.dataUsers);
      this.servicesUser.phone = response.dataUsers.phone;
      this.servicesUser.corpoelec = response.dataUsers.corpoelec;
      this.servicesUser.condominio = response.dataUsers.condominio;
    });
  }

}
