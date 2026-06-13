import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BackServiceService } from '../../service/back/back-service.service';
import { EventoResponse } from '../../models/Eventos.model';

@Component({
  selector: 'app-tela-eventos',
  imports: [RouterLink, CommonModule],
  templateUrl: './tela-eventos.html',
  styleUrl: './tela-eventos.css',
})
export class TelaEventos implements OnInit {
  eventos$!: Observable<EventoResponse[]>;

  constructor(private service: BackServiceService) {}

  ngOnInit(): void {
    this.eventos$ = this.service.listarEventos();
  }

}
