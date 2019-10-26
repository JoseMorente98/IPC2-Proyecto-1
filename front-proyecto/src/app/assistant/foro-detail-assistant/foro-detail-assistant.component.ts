import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForoService } from 'src/app/_service/foro.service';

@Component({
  selector: 'app-foro-detail-assistant',
  templateUrl: './foro-detail-assistant.component.html',
  styleUrls: ['./foro-detail-assistant.component.scss']
})
export class ForoDetailAssistantComponent implements OnInit {
  table:any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private foroService: ForoService
  ) { }

  ngOnInit() {
    this.getAll();
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

}
