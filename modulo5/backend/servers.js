const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let filmes = [];
let idAtual = 1;

app.post("/filmes", (req, res) => {
  const { titulo, genero, nota } = req.body;

  if (nota < 0 || nota > 10) {
    return res.status(400).json({ erro: "Nota deve estar entre 0 e 10." });
  }

  const novoFilme = {
    id: idAtual++,
    titulo,
    genero,
    nota,
  };

  filmes.push(novoFilme);
  res.status(201).json(novoFilme);
});

app.get("/filmes", (req, res) => {
  res.json(filmes);
});

app.get("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filme = filmes.find((f) => f.id === id);

  if (!filme) {
    return res.status(404).json({ erro: "Filme não encontrado." });
  }

  res.json(filme);
});

app.put("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, genero, nota } = req.body;

  const index = filmes.findIndex((f) => f.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Filme não encontrado." });
  }

  if (nota < 0 || nota > 10) {
    return res.status(400).json({ erro: "Nota deve estar entre 0 e 10." });
  }

  filmes[index] = { id, titulo, genero, nota };
  res.json(filmes[index]);
});

app.delete("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  filmes = filmes.filter((f) => f.id !== id);
  res.json({ mensagem: "Filme removido com sucesso." });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
