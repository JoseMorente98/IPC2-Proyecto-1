import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  data = {
    type: localStorage.getItem("currentTypeName"),
    nombre: localStorage.getItem("currentNombre") + " " +localStorage.getItem("currentApellido")
  }
  constructor() { }

  ngOnInit() {
  }

}
