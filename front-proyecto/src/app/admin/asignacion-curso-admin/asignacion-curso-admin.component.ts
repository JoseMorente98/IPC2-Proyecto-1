import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CursoDetalleService } from 'src/app/_service/curso-detalle.service';
import { SeccionService } from 'src/app/_service/seccion.service';
import { CursoService } from 'src/app/_service/curso.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { AsignacionAuxiliarService } from 'src/app/_service/asignacion-auxiliar.service';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-asignacion-curso-admin',
  templateUrl: './asignacion-curso-admin.component.html',
  styleUrls: ['./asignacion-curso-admin.component.scss']
})
export class AsignacionCursoAdminComponent implements OnInit {
  formData:FormGroup;
  formDataDelete:FormGroup;
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
    this.initializeForm();
    this.initializeFormDelete(0);
    this.initializeFormA(null);
  }

  ngOnInit() {
    this.getAllCursos();
    this.getAll();
    this.getAllSeccion();
    this.getAllAuxiliar();
  }

  initializeForm() {
    this.formData = new FormGroup({
      'semestre': new FormControl('', [Validators.required, Validators.maxLength(100)]),
      'anio': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'horaInicio': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'horaFin': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'fechaFin': new FormControl('', [Validators.required]),
      'idCurso': new FormControl('', [Validators.required]),
      'idSeccion': new FormControl('', [Validators.required]),
      'id': new FormControl(''),
    });
  }

  initializeFormA(idDetalleCurso:number) {
    this.formAssignament = new FormGroup({
      'idUsuario': new FormControl('', [Validators.required]),
      'idDetalleCurso': new FormControl(idDetalleCurso, [Validators.required]),
    });
    this.getAllAuxAssignamente(idDetalleCurso);
  }

  saveChanges() {
    this.create(this.formData.value)
  }

  saveChanges2() {
    this.update(this.formData.value)
  }

  saveChanges3() {
    this.create2(this.formAssignament.value)
  }

  public notificationError(msg:string) {
    this.notificacionError.estado = true;
    this.notificacionError.mensaje = msg;
    setTimeout(() => {
      this.notificacionError.estado = false;        
    }, 1000);
  }

  getAll() {
    this.cursoDetalleService.getAll()
    .subscribe((res) => {
      this.table = [];
      console.log(res);
      this.table = res;
    }, (error) => {
      console.log(error);
    })
  }
  
  getAllSeccion() {
    this.seccionService.getAll()
    .subscribe((res) => {
      this.secciones = [];
      this.secciones = res;
    }, (error) => {
      console.log(error);
    })
  }

  getAllCursos() {
    this.cursoService.getAll()
    .subscribe((res) => {
      this.cursos = [];
      this.cursos = res;
    }, (error) => {
      console.log(error);
    })
  }

  getAllAuxiliar() {
    this.usuarioService.getAllAux()
    .subscribe((res) => {
      this.auxiliares = [];
      this.auxiliares = res;
    }, (error) => {
      console.log(error);
    })
  }

  getAllAuxAssignamente(id:number) {
    this.asignacionAuxiliarService.getAuxiliar(id)
    .subscribe((res) => {
      this.asignacion = [];
      this.asignacion = res;
    }, (error) => {
      this.asignacion = [];
      console.log(error);
    })
  }

  getSingle(id:any) {
    this.cursoDetalleService.getSingle(id)
    .subscribe((res) => {
      console.log(res)
      this.formData.get('semestre').setValue(res.semestre);
      this.formData.get('anio').setValue(res.anio);
      this.formData.get('horaInicio').setValue(res.horaInicio);
      this.formData.get('horaFin').setValue(res.horaFin);
      this.formData.get('fechaFin').setValue(new Date(res.fechaFin).toISOString().replace(/T/, ' ').replace(/\..+/, ''));
      this.formData.get('idCurso').setValue(res.idCurso);
      this.formData.get('idSeccion').setValue(res.idSeccion);
      this.formData.get('id').setValue(res.idDetalleCurso);
    }, (error) => {
      console.log(error);
    })
  }

  delete(id:any) {
    this.cursoDetalleService.delete(id)
    .subscribe((res) => {
      console.log(res)
      if(res.data[0]._existe==0) {
        this.notificationsService.success('Exito :D', 'Curso eliminado con éxito.');
        this.getAll();
      } else {
        this.notificationsService.info('Advertencia D:', 'No se puede eliminar el detalle ya que existen alumnos asignados.');
      }
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  create(data:any) {
    console.log(data)
    this.cursoDetalleService.create(data)
    .subscribe((res) => {
      console.log(res.data[0]._existe)
      if(res.data[0]._existe==0) {
        $('#exampleModalAdd').modal('hide');
        this.notificationsService.success('Exito :D', 'Detalle de Curso agregado con éxito.');
        this.getAll();
      } else {
        this.notificationsService.info('Advertencia D:', 'Ya existe un curso con los mismos detalles en el semestre.');
      }      
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  update(data:any) {
    console.log(data)
    this.cursoDetalleService.update(data)
    .subscribe((res) => {
      $('#exampleModalUpdate').modal('hide');
      this.notificationsService.success('Exito :D', 'Curso actualizado con éxito.');
      this.getAll();
      this.initializeForm();
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  create2(data:any) {
    console.log(+this.idDetalleCurso.value)
    this.asignacionAuxiliarService.create(data)
    .subscribe((res) => {
      if(res.res[0]._existe==1) {
        this.notificationError('El auxiliar ya esta asignado.');
      } else {
        this.notificationsService.success('Exito :D', 'Auxiliar asignado con éxito.');
        this.getAllAuxAssignamente(+this.idDetalleCurso.value);
      }
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  delete2(id:any) {
    console.log(+this.idDetalleCurso.value)
    this.asignacionAuxiliarService.delete(id)
    .subscribe((res) => {
      this.getAllAuxAssignamente(+this.idDetalleCurso.value);
      this.notificationsService.success('Exito :D', 'Asignacion eliminada con éxito.');
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  get semestre() { return this.formData.get('semestre'); }
  get anio() { return this.formData.get('anio'); }
  get horaInicio() { return this.formData.get('horaInicio'); }
  get horaFin() { return this.formData.get('horaFin'); }
  get fechaFin() { return this.formData.get('fechaFin'); }
  get idCurso() { return this.formData.get('idCurso'); }
  get idSeccion() { return this.formData.get('idSeccion'); }
  get id() { return this.formData.get('id'); }
  get idUsuario() { return this.formAssignament.get('idUsuario'); }
  get idDetalleCurso() { return this.formAssignament.get('idDetalleCurso'); }

  initializeFormDelete(id:number) {
    this.formDataDelete = new FormGroup({
      'descripcion': new FormControl('', [Validators.required, Validators.maxLength(250)]),
      'estado': new FormControl(0),
      'id': new FormControl(id),
    });
  }

  saveChangesDelete() {
    this.deleteAssignament(this.formDataDelete.value)
  }

  deleteAssignament(id:any) {
    this.asignacionAuxiliarService.delete(id)
    .subscribe((res) => {
      //this.getAllAuxAssignamente(+this.idDetalleCurso.value);
      $('#exampleModalDelete').modal('hide');
      this.notificationsService.success('Exito :D', 'Asignacion eliminada con éxito.');
      this.getAllAuxAssignamente(+this.idDetalleCurso.value);
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  get descripcion() { return this.formDataDelete.get('descripcion'); }
  get estado() { return this.formDataDelete.get('estado'); }

}
