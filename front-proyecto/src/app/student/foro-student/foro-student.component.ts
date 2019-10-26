import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AsignacionAuxiliarService } from 'src/app/_service/asignacion-auxiliar.service';
import { ActivatedRoute } from '@angular/router';
import { ForoService } from 'src/app/_service/foro.service';
import { NotificationsService } from 'angular2-notifications';

//JQUERY
declare var $:any;
@Component({
  selector: 'app-foro-student',
  templateUrl: './foro-student.component.html',
  styleUrls: ['./foro-student.component.scss']
})
export class ForoStudentComponent implements OnInit {
  formData:FormGroup;
  parameter:any;
  table:any[];
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

  constructor(
    private asignacionAuxiliarService: AsignacionAuxiliarService,
    private activatedRoute: ActivatedRoute,
    private notificationsService: NotificationsService,
    private foroService: ForoService,

  ) { }

  ngOnInit() {
    this.getAll()
    this.parameter = this.activatedRoute.snapshot.paramMap.get('id');
    this.initializeForm();
  }

  getAll() {
    this.foroService.getAllByAsignacion(+this.activatedRoute.snapshot.paramMap.get('id'))
    .subscribe((res) => {
      this.table = [];
      this.table = res;
    }, (error) => {
      console.log(error);
    })
  }

  initializeForm() {
    this.formData = new FormGroup({
      'titulo': new FormControl('', [Validators.required, Validators.maxLength(255)]),
      'descripcion': new FormControl('', [Validators.required, Validators.maxLength(255)]),
      'fechaFin': new FormControl('', [Validators.required]),
      'idAsignacionAuxiliar': new FormControl(this.activatedRoute.snapshot.paramMap.get('id'), [Validators.required]),
      'id': new FormControl(''),
    });
  }

  saveChanges() {
    console.log(this.formData.value);
    this.create(this.formData.value)
  }

  getSingle(id:any) {
    this.foroService.getSingle(id)
    .subscribe((res) => {
      console.log(res)
      this.formData.get('nombre').setValue(res.nombre);
      this.formData.get('codigo').setValue(res.codigo);
      this.formData.get('estado').setValue(res.estado);
      this.formData.get('id').setValue(res.idCurso);
      console.log(this.formData.value)
    }, (error) => {
      console.log(error);
    })
  }

  delete(id:any) {
    this.foroService.delete(id)
    .subscribe((res) => {
      this.getAll();
      this.notificationsService.success('Exito :D', 'Foro eliminado con éxito.');
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  create(data:any) {
    this.foroService.create(data)
    .subscribe((res) => {
      $('#exampleModalAdd').modal('hide');
      this.notificationsService.success('Exito :D', 'Foro agregado con éxito.');
      this.getAll();
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  update(data:any) {
    this.foroService.update(data)
    .subscribe((res) => {
      $('#exampleModalUpdate').modal('hide');
      this.notificationsService.success('Exito :D', 'Foro actualizado con éxito.');
      this.getAll();
      this.formData.get('nombre').setValue("");
      this.formData.get('codigo').setValue("");
      this.formData.get('estado').setValue("");
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  get titulo() { return this.formData.get('titulo'); }
  get descripcion() { return this.formData.get('descripcion'); }
  get fechaFin() { return this.formData.get('fechaFin'); }
  get idAsignacionAuxiliar() { return this.formData.get('idAsignacionAuxiliar'); }
  get id() { return this.formData.get('id'); }

}
