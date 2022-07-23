import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../../../../services/global.service";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


interface Assets {
  assetIsoLogo: string
}

interface Menu {
  menu: string,
  icono: string,
  enlace: string
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  userOnline: any;

  assets: Assets = {
    assetIsoLogo: './../../../../assets/icons/icon-512x512.png'
  }

  testMenu: Array<Menu> = [
    {
      menu: 'Curriculum',
      icono: 'description',
      enlace: 'https://shonnyaio.github.io/assets/pdf/CV_Jonathan_Torres_English.pdf'
    },
    {
      menu: 'Web Site',
      icono: 'language',
      enlace: 'https://shonnyaio.github.io/'
    },
  ];

  constructor(
    private global: GlobalService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  closedDialog() {
    this.global.logout();
    this.router.navigateByUrl('/login');
    this.dialog.closeAll();
  }

}
