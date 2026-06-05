import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BackServiceService } from '../service/back/back-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoUsuario, Usuario } from '../models/UsuarioCadastro.model';


@Component({
  selector: 'app-tela-cadastro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './tela-cadastro.html',
  styleUrls: ['./tela-cadastro.css'],
})
export class TelaCadastro implements OnInit {

  souAluno: boolean = false;


   formulario!: FormGroup

  usuario: Usuario = {
    nome: '',
    email: '',
    dataNascimento: null,
    senha: '',
    curso: undefined,
    fotoperfil: null,
    biografia: null,
    tipoUsuario: undefined,
    rgm: undefined
  };

  constructor(
    private service: BackServiceService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: [this.usuario.nome, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      dataNascimento: [this.usuario.dataNascimento],
      senha: [this.usuario.senha, Validators.required],
      curso: [this.usuario.curso],
      fotoperfil: [this.usuario.fotoperfil],
      biografia: [this.usuario.biografia],
      tipoUsuario: [this.usuario.tipoUsuario, Validators.required],
      rgm: [this.usuario.rgm]
    })

    this.tipoUsuarioSelecionado();
  }

  cadastrar(): void {

    console.log(this.formulario.value);
    if (this.formulario.invalid) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const usuarioCadastrado = this.formulario.value;

    this.service.cadastrarUsuario(usuarioCadastrado).subscribe({
      next: (result) => {
        console.log('Cadastro bem-sucedido:', result);
        this.router.navigate(['/login']);
        this.formulario.reset();
      },

      error: (err) => {
        console.log('Erro', err);
      },
    });
  }

  protected readonly TipoUsuario = TipoUsuario;




  tipoUsuarioSelecionado(): void {
    this.formulario.get('tipoUsuario')?.valueChanges.subscribe((valor) => {
      if (valor === TipoUsuario.ALUNO) {
        this.souAluno = true;
      }
        else {
        this.souAluno = false;
      }
    });
  }

}

