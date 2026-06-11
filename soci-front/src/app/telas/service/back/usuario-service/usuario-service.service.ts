import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioIdResponse } from '../../../models/UsuarioCadastro.model';
import {UsuarioLogin, UsuarioLoginResponse} from '../../../models/UsuarioLogin.model';
import { Conectados } from '../../../models/Conexoes.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServiceService {
  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  login(usuario: UsuarioLogin): Observable<UsuarioLoginResponse> {
    return this.http.post<UsuarioLoginResponse>(`${this.url}login`, usuario);
  }

  listarPorId(id: number): Observable<UsuarioIdResponse> {
    return this.http.get<UsuarioIdResponse>(`${this.url}cadastrar/${id}`);
  }

  listarConexoes(): Observable<Conectados[]> {
    return this.http.get<Conectados[]>(`${this.url}api/conexoes`);
  }

  listarTodosUsuarios(id: number): Observable<UsuarioIdResponse[]> {
    return this.http.get<UsuarioIdResponse[]>(`${this.url}cadastrar/${id}/usuarios`);
  }
}
