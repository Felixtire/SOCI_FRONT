import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioServiceService } from '../../service/back/usuario-service/usuario-service.service';
import { Observable } from 'rxjs';
import { Conectados } from '../../models/Conexoes.model';
import { AsyncPipe, NgForOf } from '@angular/common';
import { UsuarioIdResponse, UsuarioResponse } from '../../models/UsuarioCadastro.model';
import { BackServiceService } from '../../service/back/back-service.service';
import { AuthServiceService } from '../../service/auth/auth-service.service';

@Component({
  selector: 'app-tela-conexoes',
  imports: [NgForOf, AsyncPipe],
  templateUrl: './tela-conexoes.html',
  styleUrl: './tela-conexoes.css',
})
export class TelaConexoes implements OnInit {




  constructor(private service: UsuarioServiceService, private backService: BackServiceService, private authService: AuthServiceService) {}

  conexoes$!: Observable<Conectados[]>;

  possiveisConexoes$!: Observable<UsuarioResponse[]>;

  idUsuarioLogado!: number | null;




  ngOnInit() {
    this.conexoes$ = this.service.listarConexoes();

    this.idUsuarioLogado = this.authService.pegarUsuarioId();

  if (this.idUsuarioLogado) {
    this.possiveisConexoes$ = this.service.listarTodosUsuarios(this.idUsuarioLogado);
  }

  }


  criarConexao(idDestino: number) {
    console.log(idDestino);
    const idOrigem = this.authService.pegarUsuarioId();

    if (!idOrigem) {
      console.log('Usuário não logado');
      return;
    }

    this.backService.conectarUsuarios(idOrigem, idDestino).subscribe({
      next: (res) => {
        console.log('Conexão criada com sucesso', res);
        this.conexoes$ = this.service.listarConexoes();
      },
      error: err => {
        console.log('Erro ao criar conexão', err);
      }
    });

  }

  cancelarConexao(id: number) {
    this.backService.cancelarConexao(id).subscribe({
      next: (res) => {
        console.log('Conexão cancelada com sucesso', res);
        this.conexoes$ = this.service.listarConexoes();
      },
      error: err => {
        console.log('Erro ao cancelar conexão', err);
      }
    });

  }



}
