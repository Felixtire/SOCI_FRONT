# SociFront

Documentação completa do projeto SociFront (front-end em Angular).

## Visão geral
SociFront é a aplicação front-end de uma plataforma social acadêmica construída com Angular (v21). Ele consome um backend REST (endereço configurável) que expõe endpoints para usuários, publicações, conexões e eventos.

Principais pastas:
- `src/` - código fonte Angular
  - `app/` - componentes, rotas e serviços
  - `assets/` - imagens e arquivos estáticos
  - `environments/` (se existir) - configurações de ambiente para build
- `dist/` - artefatos de build (após `ng build`)

## Requisitos
- Node.js (v18+ recomendado)
- npm (versão compatível com Node, o projeto foi desenvolvido com npm@11.11.0)
- Docker & Docker Compose (para dockerizar e rodar em containers)

> Observação: Para desenvolvimento local não é necessário ter Docker instalado.

## Configuração local (desenvolvimento)
1. Instale dependências:

```powershell
cd C:\Users\warli\Downloads\Telas\soci_front\soci-front
npm install
```

2. Rodar servidor de desenvolvimento:

```powershell
npm start
```

Abra `http://localhost:4200/` no navegador. A aplicação recarrega automaticamente quando você altera arquivos fonte.

### Configurar URL do backend
O front geralmente precisa saber a URL do backend para fazer chamadas HTTP. Existem duas abordagens comuns:

1. Usar os arquivos de ambiente (recomendado para builds):
   - `src/environments/environment.ts` e `src/environments/environment.prod.ts` (se existir) podem conter uma chave `apiUrl` ou similar.
   - Ajuste esses arquivos antes de rodar `ng build` para apontarem para o backend correto.

2. Substituir variáveis em tempo de build: você pode usar `sed`/scripts simples ou ferramentas como `envsubst` em pipelines CI para injetar a URL antes de gerar o bundle.

Exemplo mínimo (em `environment.ts`):
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/'
};
```

Certifique-se de que o valor usado no serviço (`BackServiceService`) combine com esse `apiUrl`.

## Build para produção
Gera os artefatos otimizados em `dist/`:

```powershell
npm run build
```

O conteúdo final fica em `dist/soci-front`.

## Dockerização
A seguir há instruções para criar uma imagem Docker multi-stage que compila a aplicação e a serve usando `nginx` (prática comum para SPAs).

### Arquivos incluídos
- `Dockerfile` - imagem multi-stage (builder Node / runtime nginx)
- `.dockerignore` - arquivos/pastas ignorados no contexto Docker
- `nginx.conf` - configuração nginx para fallback SPA (rota para index.html)
- `docker-compose.yml` - exemplo para subir o frontend (e um backend placeholder)

### Build e executar a imagem Docker (manual)
No diretório raiz do projeto (onde está o `Dockerfile`):

```powershell
# build da imagem
docker build -t soci-front:latest .

# rodar container local mapeando porta 8080
docker run --rm -p 8080:80 --name soci-front soci-front:latest
```

A aplicação ficará acessível em `http://localhost:8080/`.

### Usando docker-compose (exemplo)
O `docker-compose.yml` incluído define um serviço `frontend` que constrói a imagem e expõe a porta 8080. Para subir com docker-compose:

```powershell
# subir os serviços (build e run)
docker-compose up --build

# parar e remover
docker-compose down
```

> Nota: O container do frontend serve apenas os arquivos estáticos. Se desejar que o nginx faça proxy para um serviço backend dentro do mesmo compose, ajuste o `nginx.conf` e adicione o serviço `backend` no `docker-compose.yml`.

## Arquitetura de build (Dockerfile - multi-stage)
1. Stage `builder`: usa Node.js para instalar dependências e gerar o `dist/` otimizado.
2. Stage `runtime`: usa `nginx` para servir os arquivos estáticos com fallback para `index.html` (single page app).

## Dicas importantes
- Variáveis de ambiente para a API não são aplicáveis diretamente ao bundle já compilado. Se precisar trocar a URL do backend sem reconstruir a imagem, adote uma estratégia de runtime config (ex.: arquivo `config.json` injetado por volume ou um pequeno entrypoint que altera um arquivo JS com a URL antes de iniciar o nginx).
- Certifique-se de que o backend permita CORS se estiver rodando separado e consumido pelo frontend em outro host/porta.

## Debug / troubleshooting
- Se o frontend carrega mas as chamadas API retornam 404/401/500:
  - Verifique `apiUrl` configurado no Angular.
  - Veja se o backend está rodando e se aceita conexões (CORS, autenticação).
- Se o build falhar em CI:
  - Verifique versão do Node e npm.
  - Assegure que os pacotes dev (como `@angular/cli`) estão disponíveis durante o build.

## Scripts úteis
- `npm start` - servidor de desenvolvimento
- `npm run build` - build de produção (gera `dist/`)
- `npm test` - testes (Vitest/Angular Test Runner)

## Deploy
- Construir a imagem Docker e enviar para um registry (DockerHub/GCR/Azure Container Registry), depois orquestrar com sua plataforma (Docker Compose, Kubernetes, etc.).

---
Se quiser, eu posso:
- Adicionar automaticamente os arquivos `Dockerfile`, `docker-compose.yml`, `.dockerignore` e `nginx.conf` ao seu projeto agora (faço isso para você),
- Implementar uma estratégia de configuração em runtime para a URL do backend (ex.: `config.json` + script entrypoint),
- Ou adaptar o `nginx.conf` para fazer proxy reverso para um serviço backend em `docker-compose`.

Diga qual opção prefere e eu aplico as mudanças.
