import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoDetalleService } from 'src/app/_service/curso-detalle.service';
import { SeccionService } from 'src/app/_service/seccion.service';
import { CursoService } from 'src/app/_service/curso.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { AsignacionAuxiliarService } from 'src/app/_service/asignacion-auxiliar.service';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, Validators, FormControl } from '@angular/forms';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-detail-curso-admin',
  templateUrl: './detail-curso-admin.component.html',
  styleUrls: ['./detail-curso-admin.component.scss']
})
export class DetailCursoAdminComponent implements OnInit {
  formData:FormGroup;
  formAssignament:FormGroup;
  parameter:any;
  table:any[];
  secciones:any[];
  cursos:any[];
  auxiliares:any[];
  asignacion:any[];
  data = {
    id: 0,
    semestre: '',
    anio: '',
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
    private cursoDetalleService: CursoDetalleService,
    private seccionService: SeccionService,
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private asignacionAuxiliarService: AsignacionAuxiliarService,
    private notificationsService: NotificationsService
  ) {
    this.parameter = this.activatedRoute.snapshot.paramMap.get('id');
    this.getAll(this.parameter)
    this.initializeForm(0);
    //this.initializeFormA(null);
  }

  ngOnInit() {
  }


  getAll(id:number) {
    this.asignacionAuxiliarService.getCursosByAux(id)
    .subscribe((res) => {
      this.table = [];
      console.log(res);
      this.table = res;
    }, (error) => {
      console.log(error);
    })
  }

  initializeForm(id:number) {
    this.formData = new FormGroup({
      'descripcion': new FormControl('', [Validators.required, Validators.maxLength(250)]),
      'estado': new FormControl(0),
      'id': new FormControl(id),
    });
  }

  saveChanges() {
    this.delete2(this.formData.value)
  }

  delete2(id:any) {
    this.asignacionAuxiliarService.delete(id)
    .subscribe((res) => {
      //this.getAllAuxAssignamente(+this.idDetalleCurso.value);
      $('#exampleModalDelete').modal('hide');
      this.notificationsService.success('Exito :D', 'Asignacion eliminada con éxito.');
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  get descripcion() { return this.formData.get('descripcion'); }
  get estado() { return this.formData.get('estado'); }
  get id() { return this.formData.get('id'); }

}
