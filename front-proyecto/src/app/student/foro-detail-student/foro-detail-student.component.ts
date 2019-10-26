import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForoService } from 'src/app/_service/foro.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
//JQUERY
declare var $:any;
@Component({
  selector: 'app-foro-detail-student',
  templateUrl: './foro-detail-student.component.html',
  styleUrls: ['./foro-detail-student.component.scss']
})
export class ForoDetailStudentComponent implements OnInit {
  table:any[];
  formData:FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private foroService: ForoService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.getAll();
    this.initializeForm();
  }

  getAll() {
    this.foroService.getAllCommentsByForo(+this.activatedRoute.snapshot.paramMap.get('id'))
    .subscribe((res) => {
      this.table = [];
      this.table = res;
    }, (error) => {
      console.log(error);
    })
  }

  initializeForm() {
    this.formData = new FormGroup({
      'comentario': new FormControl('', [Validators.required, Validators.maxLength(250)]),
      'idUsuario': new FormControl(localStorage.getItem('currentId'), [Validators.required]),
      'idForo': new FormControl(+this.activatedRoute.snapshot.paramMap.get('id'), [Validators.required]),
      'id': new FormControl(''),
    });
  }

  saveChanges() {
    this.create(this.formData.value)
  }

  create(data:any) {
    this.foroService.createHilo(data)
    .subscribe((res) => {
      console.log(res)
      if(res.data[0]._tiempo==0) {
        this.notificationsService.success('Exito :D', 'Comentario agregado con éxito.');
        this.getAll();
      } else {
        this.notificationsService.warn('Alerta D:', 'Ya no puedes comentar se ha cerrado la asignacion.');
      }
      $('#exampleModalAdd').modal('hide');
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  get comentario() { return this.formData.get('comentario'); }
  get idUsuario() { return this.formData.get('idUsuario'); }
  get idForo() { return this.formData.get('idForo'); }
  get id() { return this.formData.get('id'); }


}
