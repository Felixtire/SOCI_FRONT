import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PublicacaoResponse } from '../../models/Publicacao.model';
import { BackServiceService } from '../../service/back/back-service.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UsuarioServiceService } from '../../service/back/usuario-service/usuario-service.service';
import { UsuarioIdResponse, UsuarioResponse } from '../../models/UsuarioCadastro.model';
import { Conectados } from '../../models/Conexoes.model';

@Component({
  selector: 'app-tela-publicacoes',
  imports: [RouterLink, CommonModule],
  templateUrl: './tela-publicacoes.html',
  styleUrl: './tela-publicacoes.css',
})


export class TelaPublicacoes implements OnInit {
  publicacoes$!:Observable<PublicacaoResponse[]>;

  usuarios: Record<number, UsuarioIdResponse> = {};

  conectados: Conectados[] =[];



  constructor(private service: BackServiceService, private usuarioService: UsuarioServiceService) {}

  ngOnInit(): void {
    this.publicacoes$ = this.service.listarPublicacoes();

    this.listarConectados();


  }

  listarUsuarioPorId(id: number): Observable<UsuarioIdResponse> {
    return this.usuarioService.listarPorId(id);
  }

  listarConectados(){
    this.usuarioService.listarConexoes().subscribe({
      next: result => {
        console.log(result);
        this.conectados = result;
      }
    })
  }




}
