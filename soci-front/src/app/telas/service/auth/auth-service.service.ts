import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {

  private TOKEN_KEY = 'token';
  private USER_ID_KEY =  'user_id';

  salvarToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  pegarToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removerToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  estaLogado(): boolean {
    return !!this.pegarToken();
  }

  salvarUsuarioId(id: number) {
    localStorage.setItem(this.USER_ID_KEY, id.toString());
  }
  pegarUsuarioId(): number | null {
    const id = localStorage.getItem(this.USER_ID_KEY);
    return id ? Number(id) : null;
  }


  constructor() {}


}
