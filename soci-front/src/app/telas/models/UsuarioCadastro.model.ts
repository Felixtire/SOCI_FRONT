export enum TipoUsuario {
  ALUNO,
  PROFESSOR

}

export interface Usuario {
  nome: string;
  email: string;
  dataNascimento: Date | null;
  senha: string;
  curso?: string;
  fotoperfil?: string | null;
  biografia?: string | null;
  tipoUsuario?: TipoUsuario;
  rgm?: string;
}


export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;

}

export interface UsuarioIdResponse {
  id: number;
  nome: string;
  email: string;
  dataNascimento?: string | null;
  curso?: string | null;
  fotoperfil?: string | null;
  biografia?: string | null;
  tipoUsuario?: TipoUsuario | null;
  rgm?: string | null;
}
