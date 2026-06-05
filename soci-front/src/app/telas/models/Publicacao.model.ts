export interface CriarPublicacao{
  conteudo: string;
  imagemUrl: string;
  usuarioId: number;

}

export interface PublicacaoResponse{
  id: number;
  conteudo: string;
  imagemUrl: string;
  dataPublicacao: Date;
  usuarioId: number;
}
