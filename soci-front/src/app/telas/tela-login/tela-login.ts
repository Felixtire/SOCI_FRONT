import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuarioServiceService } from '../service/back/usuario-service/usuario-service.service';
import { UsuarioLogin } from '../models/UsuarioLogin.model';
import { AuthServiceService } from '../service/auth/auth-service.service';

@Component({
  selector: 'app-tela-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './tela-login.html',
  styleUrl: './tela-login.css',
})
export class TelaLogin implements OnInit {
  formularioLogin!: FormGroup;

  usuarioLogadoId!: number;

  usuario: UsuarioLogin = {
    email: '',
    senha: '',
  };

  constructor(
    private service: UsuarioServiceService,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.formularioLogin = this.fb.group({
      email: [this.usuario.email],
      senha: [this.usuario.senha],
    });
  }

  logar() {

    console.log(this.formularioLogin.value);
    if (this.formularioLogin.invalid) {
      alert('Preencha todos os campos');
      return;
    }
    this.usuario = this.formularioLogin.value;

    this.service.login(this.usuario).subscribe({
      next: (res) => {
        console.log('Login com sucesso', res);
        this.auth.salvarToken(res.token);
        this.auth.salvarUsuarioId(res.idUsuario);
        this.formularioLogin.reset();
        this.router.navigate(['home']);
      },

      error: (err) => {
        console.log('Erro', err);
      },
    });
  }
}
