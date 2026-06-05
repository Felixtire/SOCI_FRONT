import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PublicacaoResponse } from '../../models/Publicacao.model';
import { BackServiceService } from '../../service/back/back-service.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tela-publicacoes',
  imports: [RouterLink, CommonModule],
  templateUrl: './tela-publicacoes.html',
  styleUrl: './tela-publicacoes.css',
})
export class TelaPublicacoes implements OnInit {
  publicacoes$!:Observable<PublicacaoResponse[]>;

  constructor(private service: BackServiceService) {}

  ngOnInit(): void {
    this.publicacoes$ = this.service.listarPublicacoes();

  }

}
