import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-usuario-admin',
  templateUrl: './usuario-admin.component.html',
  styleUrls: ['./usuario-admin.component.scss']
})
export class UsuarioAdminComponent implements OnInit {
  formData:FormGroup;
  table:any[];
  data = {
    id: 0,
    nombre: '',
    apellido: '',
    username: '',
    idTipoUsuario: ''
  }
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
    private usuarioService: UsuarioService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.getAll();
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
    if(this.data.nombre) {
      if(this.data.apellido) {
        this.update(this.data);
      } else {
        this.notificationError("La direccion es requerida");        
      }
    } else {
      this.notificationError("El nombre es requerido");
    }
  }

  public notificationError(msg:string) {
    this.notificacionError.estado = true;
    this.notificacionError.mensaje = msg;
    setTimeout(() => {
      this.notificacionError.estado = false;        
    }, 1000);
  }

  getAll() {
    this.usuarioService.getAll()
    .subscribe((res) => {
      this.table = [];
      console.log(res);
      this.table = res;
    }, (error) => {
      console.log(error);
    })
  }

  getSingle(id:any) {
    this.usuarioService.getSingle(id)
    .subscribe((res) => {
      console.log(res)
      this.data = res;
      this.data.id = res.idUsuario;
    }, (error) => {
      console.log(error);
    })
  }

  delete(id:any) {
    this.usuarioService.delete(id)
    .subscribe((res) => {
      this.getAll();
      this.notificationsService.success('Exito :D', 'Usuario eliminado con éxito.');
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  update(data:any) {
    this.usuarioService.update(data)
    .subscribe((res) => {
      this.data.nombre = "";
      this.data.apellido = "";
      this.getAll();
      this.notificationsService.success('Exito :D', 'Usuario actualizado con éxito.');
      $('#exampleModalUpdate').modal('hide');
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

}
