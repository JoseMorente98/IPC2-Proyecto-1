import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { CursoService } from 'src/app/_service/curso.service';
import { TicketService } from 'src/app/_service/ticket.service';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-ticket-admin',
  templateUrl: './ticket-admin.component.html',
  styleUrls: ['./ticket-admin.component.scss']
})
export class TicketAdminComponent implements OnInit {
  formData:FormGroup;
  parameter:any;
  table:any[];
  data = {
    id: 0,
    asunto: '',
    mensaje: '',
    username: '',
    idTipoUsuario: ''
  }
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
  public notificacionError = {
    estado: false,
    mensaje: ''
  }

  constructor(
    private ticketService: TicketService,
    private notificationsService: NotificationsService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.getAll();
  }

  initializeForm() {
    this.formData = new FormGroup({
      'asunto': new FormControl('', [Validators.required, Validators.maxLength(255)]),
      'mensaje': new FormControl('', [Validators.required, Validators.maxLength(255)]),
      'respuesta': new FormControl('', [Validators.maxLength(255)]),
      'estado': new FormControl(0),
      'id': new FormControl(''),
    });
  }

  saveChanges() {
    this.update(this.formData.value)
  }

  saveChanges2() {
    this.update(this.formData.value)
  }

  public notificationError(msg:string) {
    this.notificacionError.estado = true;
    this.notificacionError.mensaje = msg;
    setTimeout(() => {
      this.notificacionError.estado = false;        
    }, 1000);
  }

  getAll() {
    this.ticketService.getAll()
    .subscribe((res) => {
      this.table = [];
      console.log(res);
      this.table = res;
    }, (error) => {
      console.log(error);
    })
  }

  getSingle(id:any) {
    this.ticketService.getSingle(id)
    .subscribe((res) => {
      console.log(res)
      this.formData.get('asunto').setValue(res.asunto);
      this.formData.get('mensaje').setValue(res.mensaje);
      this.formData.get('respuesta').setValue(res.respuesta);
      this.formData.get('estado').setValue(res.estado);
      this.formData.get('id').setValue(res.idTicket);
      console.log(this.formData.value)
    }, (error) => {
      console.log(error);
    })
  }

  delete(id:any) {
    this.ticketService.delete(id)
    .subscribe((res) => {
      this.getAll();
      this.notificationsService.success('Exito :D', 'Ticket eliminado con éxito.');
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  create(data:any) {
    this.ticketService.create(data)
    .subscribe((res) => {
      $('#exampleModalAdd').modal('hide');
      this.notificationsService.success('Exito :D', 'Ticket agregado con éxito.');
      this.getAll();
      this.initializeForm();
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  update(data:any) {
    this.ticketService.update(data)
    .subscribe((res) => {
      $('#exampleModalAdd').modal('hide');
      this.notificationsService.success('Exito :D', 'Ticket actualizado con éxito.');
      this.getAll();
      this.initializeForm();
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }

  get asunto() { return this.formData.get('asunto'); }
  get mensaje() { return this.formData.get('mensaje'); }
  get estado() { return this.formData.get('estado'); }
  get respuesta() { return this.formData.get('respuesta'); }
  get idUsuario() { return this.formData.get('idUsuario'); }
  get id() { return this.formData.get('id'); }

}
