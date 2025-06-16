const api = "http://localhost:3000/filmes";

function limparCampos() {
  document.getElementById("id").value = "";
  document.getElementById("titulo").value = "";
  document.getElementById("genero").value = "";
  document.getElementById("nota").value = "";
}

function adicionarFilme() {
  const titulo = document.getElementById("titulo").value;
  const genero = document.getElementById("genero").value;
  const nota = parseFloat(document.getElementById("nota").value);

  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, genero, nota }),
  })
    .then((res) => res.json())
    .then(() => {
      listarFilmes();
      limparCampos();
    });
}

function atualizarFilme() {
  const id = document.getElementById("id").value;
  const titulo = document.getElementById("titulo").value;
  const genero = document.getElementById("genero").value;
  const nota = parseFloat(document.getElementById("nota").value);

  fetch(`${api}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, genero, nota }),
  })
    .then((res) => res.json())
    .then(() => {
      listarFilmes();
      limparCampos();
    });
}

function buscarFilme() {
  const id = document.getElementById("id").value;

  fetch(`${api}/${id}`)
    .then((res) => res.json())
    .then((dados) => {
      document.getElementById("titulo").value = dados.titulo;
      document.getElementById("genero").value = dados.genero;
      document.getElementById("nota").value = dados.nota;
    });
}

function removerFilme(id) {
  fetch(`${api}/${id}`, {
    method: "DELETE",
  }).then(() => listarFilmes());
}

function listarFilmes() {
  fetch(api)
    .then((res) => res.json())
    .then((filmes) => {
      const lista = document.getElementById("listaFilmes");
      lista.innerHTML = "";

      filmes.forEach((filme) => {
        const item = document.createElement("li");
        item.innerHTML = `
          <strong>${filme.id}:</strong> ${filme.titulo} (${filme.genero}) - Nota: ${filme.nota}
          <button onclick="removerFilme(${filme.id})">Excluir</button>
        `;
        lista.appendChild(item);
      });
    });
}

listarFilmes();
