export interface CriarPublicacao{
  conteudo: string;
  imagemUrl: string;

}

export interface PublicacaoResponse{
  id: number;
  conteudo: string;
  imagemUrl: string;
  dataPublicacao: Date;
  usuarioId: number;
  nomeUsuario: string;
}
