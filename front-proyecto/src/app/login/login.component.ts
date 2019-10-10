import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData:FormGroup;

  public options = {
    position: ["bottom", "right"],
    timeOut: 2000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    lastOnBottom: false,
    preventDuplicates: true,
    animate: "scale",
    maxLength: 400
  };
  public notificacionError = {
    estado: false,
    mensaje: ''
  }
  
  constructor(
    private router: Router,
    private notificationsService: NotificationsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.formData = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.maxLength(100)]),
      'password': new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  logIn() {
    console.log(this.formData.value)
    this.authService.auth(this.formData.value)
    .subscribe((res) => {
      console.log(res)
      console.log(res[0])
      switch(res[0].idTipoUsuario) {
        case 1:
          
          break;
        case 2:
          if(res.length > 1) {
            //DASHBOARD COMPARTIDO
          } else {
            //AUX
          }
          break;
        case 3:
          
          break;
      }
    }, (err) => {
      console.log(err)
    });
  }


  get email() { return this.formData.get('email'); }

  get password() { return this.formData.get('password'); }
}
