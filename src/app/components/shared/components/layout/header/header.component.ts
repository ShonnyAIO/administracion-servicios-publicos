import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { GlobalService } from "../../../../../services/global.service";
import { environment } from 'src/environments/environment';
import { ServiciosService } from 'src/app/services/servicios.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  respuesta!: any;
  readonly PUBLIC_KEY = environment.publicKey;

  activateDemoAuth: Boolean = true; //VARIABLE TEMPORAL PARA MAQUETADO, EMULA LA AUTENTIFICACION DE UN USUARIO
  demoUserInfo: any = { //REEMPLAZAR POR INFORMACIÓN DEL API
    nombre: 'Jonathan Torres',
    rol: 'Usuario',
    logo: './../../../../assets/icons/icon-512x512.png'
  }
  constructor(public dialog: MatDialog, private swPush: SwPush) {
  }

  ngOnInit(): void {
    console.log('%cNOS ENCANTA TU CURIOSIDAD, PERO NO DEBERIAS ESTAR AQUI!', 'color: #FFD500; font-size: 24px;');
    if (localStorage.getItem('token')) {
      this.activateDemoAuth = false;
      this.demoUserInfo.nombre = localStorage.getItem('user');
    }
  }


  openDialog() {
    const dialogRef = this.dialog.open(SideBarComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.PUBLIC_KEY
    }).then((res: any) => {
      console.log(res);
      this.respuesta = JSON.stringify(res);
      console.log(this.respuesta);
    })
      .catch((err: any) => {
        console.error(err);
        this.respuesta = err;
      })
  }

}
