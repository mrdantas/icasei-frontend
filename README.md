# iCasei Frontend Test Project

## Pré-requisitos
Docker
Node.js e npm (se for rodar localmente)

# Iniciando
1 - Clone o repositório

## Rodar com Docker:
2 - Construa e inicie os contêineres:
docker-compose up --build

Este comando iniciará os três componentes (mf_drawer, mf_videos e bff) usando Docker.

## Rodar Localmente:
Se preferir rodar o projeto localmente sem Docker, siga estes passos:

### Backend (BFF)
Navegue até o diretório bff:
cd bff

### Instale as dependências:
npm install

### Inicie o servidor
npm start


### Inicie os containers
docker-compose up --build


## Rodando testes
Para rodar os testes do componente BFF, navegue até o diretório bff:
cd bff

### Rode os testes
npm test


## Uso
Depois de garantir que os containers estão em execução, acesse os serviços nos seguintes URLs no navegador:

Main Application: http://127.0.0.1:8082
MF Drawer: http://127.0.0.1:8080
MF Videos: http://127.0.0.1:8081
BFF (API): http://127.0.0.1:3000/api/videos?q=test


## Solução de Problemas
Se encontrar algum problema, certifique-se de que:

- O Docker está instalado e rodando.
- A chave da API do YouTube em bff/src/server.js é válida.
- As dependências estão corretamente instaladas rodando npm install nos respectivos diretórios.







