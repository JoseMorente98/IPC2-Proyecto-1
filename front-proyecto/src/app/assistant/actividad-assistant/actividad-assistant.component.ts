import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ActividadService } from 'src/app/_service/actividad.service';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-actividad-assistant',
  templateUrl: './actividad-assistant.component.html',
  styleUrls: ['./actividad-assistant.component.scss']
})
export class ActividadAssistantComponent implements OnInit {
  formData:FormGroup;
  parameter:any;
  table:any[];
  data = {
    id: 0,
    nombre: '',
    codigo: '',
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
    private actividadService: ActividadService,
    private notificationsService: NotificationsService
  ) {
    this.initializeForm();
    this.parameter = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getAll();
  }

  initializeForm() {
    this.formData = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.maxLength(100)]),
      'fechaLimite': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'ponderacion': new FormControl('', [Validators.required]),
      'estado': new FormControl('', [Validators.required]),
      'idDetalleCurso': new FormControl(this.activatedRoute.snapshot.paramMap.get('id')),
      'id': new FormControl(''),
    });
  }

  

  saveChanges() {
    console.log(this.formData.value)
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

  getAll() {
    this.actividadService.getAll()
    .subscribe((res) => {
      this.table = [];
      console.log(res);
      this.table = res;
    }, (error) => {
      console.log(error);
    })
  }

  getSingle(id:any) {
    this.actividadService.getSingle(id)
    .subscribe((res) => {
      console.log(res)
      this.formData.get('nombre').setValue(res.nombre);
      this.formData.get('fechaLimite').setValue(res.fechaLimite);
      this.formData.get('ponderacion').setValue(res.ponderacion);
      this.formData.get('estado').setValue(res.estado);
      this.formData.get('id').setValue(res.idActividad);
      this.formData.get('idDetalleCurso').setValue(res.idDetalleCurso);
      console.log(this.formData.value)
    }, (error) => {
      console.log(error);
    })
  }

  delete(id:any) {
    this.actividadService.delete(id)
    .subscribe((res) => {
      this.getAll();
      this.notificationsService.success('Exito :D', 'Curso eliminado con éxito.');
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  create(data:any) {
    this.actividadService.create(data)
    .subscribe((res) => {
      $('#exampleModalAdd').modal('hide');
      this.notificationsService.success('Exito :D', 'Curso agregado con éxito.');
      this.getAll();
      this.initializeForm();
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  update(data:any) {
    this.actividadService.update(data)
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

  get nombre() { return this.formData.get('nombre'); }
  get fechaLimite() { return this.formData.get('fechaLimite'); }
  get ponderacion() { return this.formData.get('ponderacion'); }
  get idDetalleCurso() { return this.formData.get('idDetalleCurso'); }
  get estado() { return this.formData.get('estado'); }
  get id() { return this.formData.get('id'); }
  
}
