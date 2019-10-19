import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { UsuarioService } from '../_service/usuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
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

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.formData = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.maxLength(100)]),
      'idTipoUsuario': new FormControl('3'),
      'apellido': new FormControl('', [Validators.required, Validators.maxLength(100)]),
      'carnet': new FormControl('', [Validators.required, Validators.maxLength(10)]),
      'email': new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), , Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,16}')])
    });
  }

  saveChanges() {
    this.create(this.formData.value)
  }

  create(data:any) {
    this.usuarioService.create(data)
    .subscribe((res) => {
      console.log(res)
      if(res.status==200) {
        this.notificationsService.success('Exito :D', 'Usuario registrado exitosamente.');
        setTimeout(() => {
          //INICIAR SESION
          this.router.navigate(['/login'])
        }, 1000);
      } else {
        this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');        
      }
    }, error => {
      this.notificationsService.error('Error D:', error);
    })
  }

  get nombre() { return this.formData.get('nombre'); }
  get apellido() { return this.formData.get('apellido'); }
  get email() { return this.formData.get('email'); }
  get carnet() { return this.formData.get('carnet'); }
  get password() { return this.formData.get('password'); }


}
