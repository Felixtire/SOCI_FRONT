import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Usuario, UsuarioResponse } from '../../models/UsuarioCadastro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackServiceService {

  private url = 'http://localhost:8080/';


  constructor(private http: HttpClient) { }


  cadastrarUsuario(usuario: Usuario): Observable<HttpResponse<UsuarioResponse>>{

    return this.http.post<UsuarioResponse>(`${this.url}cadastrar`, usuario, { observe: 'response' });

  }

}
