import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { NotificationsService } from 'angular2-notifications';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-student-admin',
  templateUrl: './student-admin.component.html',
  styleUrls: ['./student-admin.component.scss']
})
export class StudentAdminComponent implements OnInit {
  formData:FormGroup;
  parameter:any;
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private notificationsService: NotificationsService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.parameter = this.activatedRoute.snapshot.paramMap.get('type');
    this.getAllAdmin();
  }

  initializeForm() {
    this.formData = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.maxLength(100)]),
      'carnet': new FormControl(null, [Validators.maxLength(9)]),
      'apellido': new FormControl('', [Validators.required, Validators.maxLength(100)]),
      'email': new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      'idTipoUsuario': new FormControl('3'),
      'id': new FormControl(''),
    });
  }

  saveChanges() {
    this.create(this.formData.value)
  }

  saveChanges2() {
    this.update(this.formData.value)
  }

  public notificationError(msg:string) {
    this.notificacionError.estado = true;
    this.notificacionError.mensaje = msg;
    setTimeout(() => {
      this.notificacionError.estado = false;        
    }, 1000);
  }

  getAllAdmin() {
    this.usuarioService.getAllStudent()
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
      this.formData.get('nombre').setValue(res.nombre);
      this.formData.get('apellido').setValue(res.apellido);
      this.formData.get('email').setValue(res.email);
      this.formData.get('password').setValue(res.password);
      this.formData.get('id').setValue(res.idUsuario);
      if(res.carnet) {
        this.formData.get('carnet').setValue(res.carnet);
      } else {
        this.formData.get('carnet').setValue("");
      }
      console.log(this.formData.value)
    }, (error) => {
      console.log(error);
    })
  }

  delete(id:any) {
    this.usuarioService.delete(id)
    .subscribe((res) => {
      this.getAllAdmin();
      this.notificationsService.success('Exito :D', 'Usuario eliminado con éxito.');
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  create(data:any) {
    this.usuarioService.create(data)
    .subscribe((res) => {
      $('#exampleModalAdd').modal('hide');
      this.notificationsService.success('Exito :D', 'Usuario agregado con éxito.');
      this.getAllAdmin();
      this.formData.get('nombre').setValue("");
      this.formData.get('apellido').setValue("");
      this.formData.get('email').setValue("");
      this.formData.get('password').setValue("");
      this.formData.get('carnet').setValue("");
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  update(data:any) {
    this.usuarioService.update(data)
    .subscribe((res) => {
      $('#exampleModalUpdate').modal('hide');
      this.notificationsService.success('Exito :D', 'Usuario actualizado con éxito.');
      this.getAllAdmin();
      this.formData.get('nombre').setValue("");
      this.formData.get('apellido').setValue("");
      this.formData.get('email').setValue("");
      this.formData.get('password').setValue("");
      this.formData.get('carnet').setValue("");
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  get nombre() { return this.formData.get('nombre'); }
  get apellido() { return this.formData.get('apellido'); }
  get email() { return this.formData.get('email'); }
  get password() { return this.formData.get('password'); }
  get carnet() { return this.formData.get('carnet'); }
  get id() { return this.formData.get('id'); }

  createType(idUsuario:any) {
    let data = {
      idUsuario: idUsuario,
      idTipoUsuario: 2
    }
    this.usuarioService.createType(data)
    .subscribe((res) => {
      console.log(res.data[0]._existe)
      if(res.data[0]._existe==0) {
        this.notificationsService.success('Exito :D', 'Auxiliar creado con éxito.');
        this.router.navigate(['/admin/auxiliar']);
      } else {
        this.notificationsService.info('Advertencia D:', 'No puede asignar el mismo rol varias veces.');
      }
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }
}
