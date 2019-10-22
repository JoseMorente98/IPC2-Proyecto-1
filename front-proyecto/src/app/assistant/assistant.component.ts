import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss']
})
export class AssistantComponent implements OnInit {
  data = {
    type: localStorage.getItem("currentTypeName"),
    nombre: localStorage.getItem("currentNombre") + " " +localStorage.getItem("currentApellido")
  }
  constructor() { }

  ngOnInit() {
  }
  
  logOut() {
    localStorage.clear();
  }

}
