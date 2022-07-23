import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private servicios: ServiciosService, private router: Router) {
    this.loginForms();
  }

  formLogin: FormGroup = new FormGroup({});

  ngOnInit(): void {
  }

  private loginForms() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  loginAccount() {
    if (this.formLogin.value) {
      console.log('Ingresando los datos', this.formLogin.value);
      this.servicios.postLogin(this.formLogin.value).subscribe((response: any) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', response.data.user.name);
          localStorage.setItem('user_id', response.data.user._id);
          this.router.navigateByUrl('/dashboard');
        }
      });
    }
  }

  getErrorMessage(field: string): any {
    let value = this.formLogin.get(field);
    if (value?.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    if (value?.touched) {
      return 'No has interactuado con este formulario';
    }
  }

}
