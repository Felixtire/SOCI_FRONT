import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Usuario, UsuarioResponse } from '../../models/UsuarioCadastro.model';
import { Observable } from 'rxjs';
import { CriarPublicacao, PublicacaoResponse } from '../../models/Publicacao.model';
import { Conectados } from '../../models/Conexoes.model';

@Injectable({
  providedIn: 'root',
})
export class BackServiceService {
  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: Usuario): Observable<HttpResponse<UsuarioResponse>> {
    return this.http.post<UsuarioResponse>(`${this.url}cadastrar`, usuario, {
      observe: 'response',
    });
  }

  criarPublicacao(publicacao: CriarPublicacao): Observable<PublicacaoResponse> {
    return this.http.post<PublicacaoResponse>(`${this.url}publicacoes`, publicacao);
  }

  listarPublicacoes(): Observable<PublicacaoResponse[]> {
    return this.http.get<PublicacaoResponse[]>(`${this.url}publicacoes`);
  }

  conectarUsuarios(origemId: number, destinoId: number): Observable<Conectados> {
    return this.http.post<Conectados>(`${this.url}api/conexoes/${origemId}/${destinoId}`, {});
  }

  cancelarConexao(id: number): Observable<void> {
    return this.http.delete<void>( `${this.url}api/conexoes/${id}`);

  }

  criarEvento(){

  }

  listarEventos(){

  }



}
