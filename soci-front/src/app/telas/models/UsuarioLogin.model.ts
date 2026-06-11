export interface UsuarioLogin{
  email: string;
  senha: string;

}

export interface UsuarioLoginResponse{
  idUsuario: number;
  token: string;

}
