const express = require("express");
const app = express();
const porta = 3000;

app.get("/saudacao/:nome", (req, res) => {
  const nome = req.params.nome;
  res.send(`Olá, ${nome}!`);
});

app.get("/soma", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res
      .status(400)
      .json({ erro: "Parâmetros a e b devem ser números." });
  }

  const resultado = a + b;
  res.json({ a, b, resultado });
});

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});
