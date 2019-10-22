import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
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
