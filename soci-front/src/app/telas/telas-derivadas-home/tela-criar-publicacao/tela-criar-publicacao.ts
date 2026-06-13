import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackServiceService } from '../../service/back/back-service.service';
import { Router } from '@angular/router';
import { CriarPublicacao, PublicacaoResponse } from '../../models/Publicacao.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tela-criar-publicacao',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tela-criar-publicacao.html',
  styleUrl: './tela-criar-publicacao.css',
})
export class TelaCriarPublicacao implements OnInit {
  formularioPublicacao!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: BackServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioPublicacao = this.fb.group({
      conteudo: ['', [Validators.required, Validators.maxLength(2000)]],
      imagemUrl: ['']
    });
  }

  criarPublicacao(): void {
    if (this.formularioPublicacao.invalid) return;

    const payload: CriarPublicacao = this.formularioPublicacao.value;
    this.service.criarPublicacao(payload).subscribe({
      next: (res: PublicacaoResponse) => {
        console.log('Publicação criada', res);
        this.formularioPublicacao.reset();
        this.router.navigate(['home','publicacoes']);
      },
      error: (err) => {
        console.error('Erro ao criar publicação', err);
      }
    });
  }
}
