import { Component, OnInit } from '@angular/core';
import { AsignacionAuxiliarService } from 'src/app/_service/asignacion-auxiliar.service';

@Component({
  selector: 'app-cursos-assistant',
  templateUrl: './cursos-assistant.component.html',
  styleUrls: ['./cursos-assistant.component.scss']
})
export class CursosAssistantComponent implements OnInit {
  table:any[];
  constructor(
    private asignacionAuxiliarService: AsignacionAuxiliarService
  ) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.asignacionAuxiliarService.getCursosByAux(+localStorage.getItem('currentId'))
    .subscribe((res) => {
      this.table = [];
      console.log(res);
      this.table = res;
    }, (error) => {
      console.log(error);
    })
  }

}
