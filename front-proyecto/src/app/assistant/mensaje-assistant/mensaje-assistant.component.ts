import { Component, OnInit } from '@angular/core';
import { MensajeService } from 'src/app/_service/mensaje.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-mensaje-assistant',
  templateUrl: './mensaje-assistant.component.html',
  styleUrls: ['./mensaje-assistant.component.scss']
})
export class MensajeAssistantComponent implements OnInit {
  table:any[] = [];
  table2:any[] = [];
  formData:FormGroup;
  mensajes:any[] = [];
  selectData:any;
  usuarioID:number = +localStorage.getItem('currentId');
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
    private mensajeService: MensajeService,
    private usuarioService: UsuarioService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.getAll();
    this.initializeForm(0, 0);
    this.getAllUsuarios();
  }

  initializeForm(idUsuario1:number, idUsuario2:number) {
    this.formData = new FormGroup({
      'usuario1': new FormControl(idUsuario1, [Validators.required]),
      'usuario2': new FormControl(idUsuario2, [Validators.required]),
      'asunto': new FormControl('', [Validators.required]),
      'mensaje': new FormControl('', [Validators.required]),
      'file': new FormControl(null)
    });
  }

  getAll() {
    this.mensajeService.getAllReceiver(+localStorage.getItem('currentId'))
    .subscribe((res) => {
      this.table = [];
      console.log(res);
      this.table = res;
    }, (error) => {
      console.log(error);
    })
  }

  getAllUsuarios() {
    this.usuarioService.getAllStudent()
    .subscribe((res) => {
      this.table2 = [];
      console.log(res);
      this.table2 = res;
    }, (error) => {
      console.log(error);
    })
  }

  getAllMessage(idUsuario1:number) {
    this.mensajeService.getAllMessages(+localStorage.getItem('currentId'), idUsuario1)
    .subscribe((res) => {
      this.mensajes = [];
      console.log(res);
      this.mensajes = res;
    }, (error) => {
      console.log(error);
    })
  }

  selectMessage(data:any) {
    console.log(data)
    this.selectData = data;
    if(data.idUsuario) {
      this.getAllMessage(data.idUsuario)
      this.initializeForm(+localStorage.getItem('currentId'), data.idUsuario);
    } else {
      this.getAllMessage(data.Receptor)
      this.initializeForm(+localStorage.getItem('currentId'), data.Receptor);
    }
  }

  create(data:any) {
    this.mensajeService.create(data)
    .subscribe((res) => {
      this.notificationsService.success('Exito :D', 'Mensaje enviado con éxito.');
      this.selectMessage(this.selectData);
      this.getAll();
      this.formData.get('asunto').setValue(null);
      this.formData.get('mensaje').setValue(null);
      this.formData.get('file').setValue(null);
    }, (error) => {
      console.log(error);
      this.notificationsService.error('Error D:', 'Ha ocurrido un error intente más tarde.');
    })
  }


  saveChanges() {
    //console.log(this.formData.value)
    this.create(this.formData.value)
  }

  get usuario1() { return this.formData.get('usuario1'); }
  get usuario2() { return this.formData.get('usuario2'); }
  get file() { return this.formData.get('file'); }
  get mensaje() { return this.formData.get('mensaje'); }
  get asunto() { return this.formData.get('asunto'); }

}
