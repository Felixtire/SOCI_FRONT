import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BackServiceService } from '../../service/back/back-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CriarPublicacao } from '../../models/Publicacao.model';

@Component({
  selector: 'app-tela-criar-evento',
  imports: [ReactiveFormsModule],
  templateUrl: './tela-criar-evento.html',
  styleUrl: './tela-criar-evento.css',
})
export class TelaCriarEvento implements OnInit {
  formularioPublicacao!: FormGroup;

  publicacao: CriarPublicacao = {
    conteudo: '',
    imagemUrl: ''
  };

  nomeUsuario!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private service: BackServiceService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.formularioPublicacao = this.fb.group({
      conteudo: [this.publicacao.conteudo],
      imagemUrl: [this.publicacao.imagemUrl],
    });


  }


  criarPublicacao() {
    const novaPublicacao = this.formularioPublicacao.value;

    this.service.criarPublicacao(novaPublicacao).subscribe({
      next: (res) => {
        console.log('Publicação criada com sucesso', res);
        this.nomeUsuario = res.nomeUsuario;
        this.formularioPublicacao.reset();
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log('Erro ao criar publicação', err);
      },
    });
  }
}
