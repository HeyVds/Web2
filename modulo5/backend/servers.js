const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const db = new Database("filmes.db");

app.use(cors());
app.use(express.json());

db.exec(`
  CREATE TABLE IF NOT EXISTS filmes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    genero TEXT NOT NULL,
    nota REAL NOT NULL CHECK (nota >= 0 AND nota <= 10)
  )
`);

app.post("/filmes", (req, res) => {
  const { titulo, genero, nota } = req.body;
  if (nota < 0 || nota > 10) {
    return res.status(400).json({ erro: "Nota deve estar entre 0 e 10." });
  }

  const stmt = db.prepare(
    "INSERT INTO filmes (titulo, genero, nota) VALUES (?, ?, ?)"
  );
  const info = stmt.run(titulo, genero, nota);
  const filmeCriado = db
    .prepare("SELECT * FROM filmes WHERE id = ?")
    .get(info.lastInsertRowid);
  res.status(201).json(filmeCriado);
});

app.get("/filmes", (req, res) => {
  const filmes = db.prepare("SELECT * FROM filmes").all();
  res.json(filmes);
});

app.get("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filme = db.prepare("SELECT * FROM filmes WHERE id = ?").get(id);

  if (!filme) {
    return res.status(404).json({ erro: "Filme não encontrado." });
  }

  res.json(filme);
});

app.put("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, genero, nota } = req.body;

  if (nota < 0 || nota > 10) {
    return res.status(400).json({ erro: "Nota deve estar entre 0 e 10." });
  }

  const stmt = db.prepare(
    "UPDATE filmes SET titulo = ?, genero = ?, nota = ? WHERE id = ?"
  );
  const result = stmt.run(titulo, genero, nota, id);

  if (result.changes === 0) {
    return res.status(404).json({ erro: "Filme não encontrado." });
  }

  const filmeAtualizado = db
    .prepare("SELECT * FROM filmes WHERE id = ?")
    .get(id);
  res.json(filmeAtualizado);
});

app.delete("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = db.prepare("DELETE FROM filmes WHERE id = ?").run(id);

  if (result.changes === 0) {
    return res.status(404).json({ erro: "Filme não encontrado." });
  }

  res.json({ mensagem: "Filme removido com sucesso." });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
