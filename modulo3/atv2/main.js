const cepForm = document.getElementById("cepForm");
const cepInput = document.getElementById("cepInput");
const addressList = document.getElementById("addressList");

cepForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const cep = cepInput.value.trim();

  if (!cep) return;

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar o CEP");
      }
      return response.json();
    })
    .then((data) => {
      if (data.erro) {
        throw new Error("CEP inválido ou não encontrado.");
      }

      const li = document.createElement("li");
      li.className = "cep-item";

      const logradouro = document.createElement("span");
      logradouro.textContent = `Logradouro: ${data.logradouro || "N/A"}`;

      const bairro = document.createElement("span");
      bairro.textContent = ` | Bairro: ${data.bairro || "N/A"}`;

      const cidade = document.createElement("span");
      cidade.textContent = ` | Cidade: ${data.localidade} - ${data.uf}`;

      const cepSpan = document.createElement("span");
      cepSpan.textContent = ` | CEP: ${data.cep}`;

      const button = document.createElement("button");
      button.textContent = "Remover";
      button.className = "delete-button";

      button.addEventListener("click", function () {
        addressList.removeChild(li);
      });

      li.appendChild(logradouro);
      li.appendChild(bairro);
      li.appendChild(cidade);
      li.appendChild(cepSpan);
      li.appendChild(button);

      addressList.appendChild(li);
      cepInput.value = "";
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert(error.message);
    });
});
