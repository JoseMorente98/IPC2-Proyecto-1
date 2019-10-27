import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AsignacionAuxiliarService } from 'src/app/_service/asignacion-auxiliar.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { EvaluacionService } from 'src/app/_service/evaluacion.service';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-evaluacion-assistant',
  templateUrl: './evaluacion-assistant.component.html',
  styleUrls: ['./evaluacion-assistant.component.scss']
})
export class EvaluacionAssistantComponent implements OnInit {
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
    private evaluacionService: EvaluacionService,

  ) { }

  ngOnInit() {
    this.getAll()
    this.parameter = this.activatedRoute.snapshot.paramMap.get('id');
    this.initializeForm();
  }

  getAll() {
    this.evaluacionService.getByDetalleCurso(+this.activatedRoute.snapshot.paramMap.get('id'))
    .subscribe((res) => {
      this.table = [];
      this.table = res;
    }, (error) => {
      console.log(error);
    })
  }

  initializeForm() {
    this.formData = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.maxLength(255)]),
      'habilitar': new FormControl(null),
      'aleatorio': new FormControl(null),
      'punteo': new FormControl('', [Validators.required, Validators.maxLength(3)]),
      'idDetalleCurso': new FormControl(this.activatedRoute.snapshot.paramMap.get('id'), [Validators.required]),
      'id': new FormControl(''),
    });
  }

  saveChanges() {
    console.log(this.formData.value);
    this.create(this.formData.value)
  }

  saveChanges2() {
    console.log(this.formData.value);
    this.update(this.formData.value)
  }

  getSingle(id:any) {
    this.evaluacionService.getSingle(id)
    .subscribe((res) => {
      console.log(res)
      this.formData.get('nombre').setValue(res.nombre);
      this.formData.get('habilitar').setValue(res.habilitar);
      this.formData.get('aleatorio').setValue(res.aleatorio);
      this.formData.get('id').setValue(res.idEvaluacion);
      this.formData.get('punteo').setValue(res.punteo);
      console.log(this.formData.value)
    }, (error) => {
      console.log(error);
    })
  }

  delete(id:any) {
    this.evaluacionService.delete(id)
    .subscribe((res) => {
      this.getAll();
      this.notificationsService.success('Exito :D', 'Evaluacion eliminada con éxito.');
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  create(data:any) {
    this.evaluacionService.create(data)
    .subscribe((res) => {
      $('#exampleModalAdd').modal('hide');
      this.notificationsService.success('Exito :D', 'Evaluacion agregada con éxito.');
      this.getAll();
      this.initializeForm();
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  update(data:any) {
    this.evaluacionService.update(data)
    .subscribe((res) => {
      $('#exampleModalUpdate').modal('hide');
      this.notificationsService.success('Exito :D', 'Evaluacion actualizada con éxito.');
      this.getAll();
      this.initializeForm();
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  get nombre() { return this.formData.get('nombre'); }
  get habilitar() { return this.formData.get('habilitar'); }
  get aleatorio() { return this.formData.get('aleatorio'); }
  get punteo() { return this.formData.get('punteo'); }
  get idDetalleCurso() { return this.formData.get('idDetalleCurso'); }
  get id() { return this.formData.get('id'); }

}
