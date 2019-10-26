import { Component, OnInit } from '@angular/core';
import { AsignacionAuxiliarService } from 'src/app/_service/asignacion-auxiliar.service';
import { AsignacionEstudianteService } from 'src/app/_service/asignacion-estudiante.service';
import { NotificationsService } from 'angular2-notifications';
import { CursoDetalleService } from 'src/app/_service/curso-detalle.service';

@Component({
  selector: 'app-cursos-student',
  templateUrl: './cursos-student.component.html',
  styleUrls: ['./cursos-student.component.scss']
})
export class CursosStudentComponent implements OnInit {
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
    private asignacionStudentService: AsignacionEstudianteService,
    private cursoDetalleService: CursoDetalleService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.getAll()
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

  create(data:any) {
    this.asignacionStudentService.create(data)
    .subscribe((res) => {
      console.log(res.res[0]._existe)
      if(res.res[0]._existe==0) {
        this.notificationsService.success('Exito :D', 'Curso agregado con éxito.');
      } else if(res.res[0]._existe==1) {
        this.notificationsService.warn('Alerta D:', 'Ya no puedes asignarte ha finalizado el tiempo de asignación.');
      } else {
        this.notificationsService.info('Advertencia D:', 'No puede asignarse al mismo curso varias veces.');
      }
      //this.getAll();*/
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  saveChanges(id:number) {
    let data = {
      idAsignacionAuxiliar: id,
      idUsuario: localStorage.getItem('currentId'),
    }
    this.create(data);
  }

}
