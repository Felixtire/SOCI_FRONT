import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackServiceService } from '../../service/back/back-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventoRequest, EventoResponse } from '../../models/Eventos.model';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../service/auth/auth-service.service';

@Component({
  selector: 'app-tela-criar-evento',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tela-criar-evento.html',
  styleUrl: './tela-criar-evento.css',
})
export class TelaCriarEvento implements OnInit {
  idUser!: number | null;
  formularioEvento!: FormGroup;

  constructor(
    private router: Router,
    private service: BackServiceService,
    private fb: FormBuilder,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.formularioEvento = this.fb.group({
      titulo: ['', [Validators.required]],
      descricao: [''],
      dataEvento: ['', [Validators.required]],
      local: [''],
    });

    this.idUser = this.authService.pegarUsuarioId();

  }

  criarEvento() {
    if (this.formularioEvento.invalid) return;

    const novoEvento: EventoRequest = this.formularioEvento.value;
    const idUser = Number(this.idUser);

    this.service.criarEvento(novoEvento,idUser).subscribe({
      next: (res: EventoResponse) => {
        console.log('Evento criado', res);
        this.formularioEvento.reset();
        this.router.navigate(['home', 'eventos']);
      },
      error: (err) => {
        console.error('Erro ao criar evento', err);
      }
    });
  }
}
