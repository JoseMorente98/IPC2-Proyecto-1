import { Component, OnInit } from '@angular/core';
import { AsignacionAuxiliarService } from 'src/app/_service/asignacion-auxiliar.service';

@Component({
  selector: 'app-foro-assistant',
  templateUrl: './foro-assistant.component.html',
  styleUrls: ['./foro-assistant.component.scss']
})
export class ForoAssistantComponent implements OnInit {

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
