export interface EventoRequest {
  titulo: string;
  descricao: string;
  dataEvento: string;
  local: string;
}


export interface EventoResponse {
  idEvento: number;
  titulo: string;
  descricao: string;
  dataEvento: string;
  local: string;
  usuarioId: number;
  nomeUsuario: string;
}
