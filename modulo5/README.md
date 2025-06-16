# CRUD de Filmes/Séries

Projeto simples de cadastro de filmes e séries usando Node.js no backend e HTML/CSS/JS no frontend.

## Funcionalidades

- Adicionar filmes/séries com título, gênero e nota (0 a 10)
- Visualizar todos os registros
- Atualizar um registro pelo ID
- Buscar um registro pelo ID
- Excluir um registro

## Como usar

### Backend

1. Acesse a pasta `backend`:

   ```md
   cd backend
   ```

2. Instale as dependências:

   ```md
   npm install
   ```

3. Inicie o servidor:

   ```md
   node server.js
   ```

O backend será iniciado em `http://localhost:3000`.

### Frontend

Abra o arquivo `frontend/index.html` no navegador.

## Observações

- Os dados são armazenados apenas na memória. Ao reiniciar o servidor, os registros serão apagados.
- Não é necessário banco de dados.
