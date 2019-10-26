import { Component, OnInit } from '@angular/core';
import { AsignacionAuxiliarService } from 'src/app/_service/asignacion-auxiliar.service';
import { AsignacionEstudianteService } from 'src/app/_service/asignacion-estudiante.service';
import { NotificationsService } from 'angular2-notifications';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-mis-cursos-student',
  templateUrl: './mis-cursos-student.component.html',
  styleUrls: ['./mis-cursos-student.component.scss']
})
export class MisCursosStudentComponent implements OnInit {
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
    private asignacionStudentService: AsignacionEstudianteService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.asignacionStudentService.getCursosByStudent(+localStorage.getItem('currentId'))
    .subscribe((res) => {
      this.table = [];
      console.log(res);
      this.table = res;
    }, (error) => {
      console.log(error);
    })
  }

  delete(idDetalleCurso:number, idAsignacionEstudiante:number) {
    let data = {
      idDetalleCurso: idDetalleCurso,
      idAsignacionEstudiante: idAsignacionEstudiante
    }
    this.asignacionStudentService.delete(data)
    .subscribe((res) => {
      console.log(res)
      if(res.data[0]._existe==0) {
        this.notificationsService.success('Exito :D', 'Se ha realizado la desasignación con éxito.');
      } else {
        this.notificationsService.warn('Alerta D:', 'Ya no puedes desasignarte ha finalizado el tiempo de desasignación.');
      }
      this.getAll();
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }


}
