import { Routes } from '@angular/router';
import { TelaCadastro } from './telas/tela-cadastro/tela-cadastro';
import { TelaLogin } from './telas/tela-login/tela-login';
import { HomeComponent } from './telas/tela-home/initial-component/home-component';
import { TelaPerfil } from './telas/telas-derivadas-home/tela-perfil/tela-perfil';
import { TelaEventos } from './telas/telas-derivadas-home/tela-eventos/tela-eventos';
import { BaseComponent } from './telas/base-component/base-component';
import { TelaCriarEvento } from './telas/telas-derivadas-home/tela-criar-evento/tela-criar-evento';
import { TelaPublicacoes } from './telas/telas-derivadas-home/tela-publicacoes/tela-publicacoes';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'cadastro',
    component: TelaCadastro
  },

  {
    path: 'login',
    component: TelaLogin
  },

  {
    path: 'home',
    component: BaseComponent,
    children: [
      { path: '', redirectTo: 'eventos', pathMatch: 'full' },
      { path: 'eventos', component: TelaEventos },
      { path: 'perfil', component: TelaPerfil },
      {path: 'criar-evento', component: TelaCriarEvento},
      {path:'publicacoes', component: TelaPublicacoes}
    ]
  }
];
