import { Routes } from '@angular/router';
import { TelaCadastro } from './telas/tela-cadastro/tela-cadastro';
import { TelaLogin } from './telas/tela-login/tela-login';

export const routes: Routes = [
  {
    path: '',
    component: TelaCadastro
  },

  {
    path: 'login',
    component: TelaLogin
  }


];
