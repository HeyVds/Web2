/* Ativ 1 */
function calcularIMC(peso, altura) {
  const imc = peso / altura ** 2;
  let classificacao = "";

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
  } else if (imc < 25) {
    classificacao = "Peso normal";
  } else if (imc < 30) {
    classificacao = "Sobrepeso";
  } else {
    classificacao = "Obesidade";
  }

  return `IMC: ${imc.toFixed(2)} - ${classificacao}`;
}

console.log(calcularIMC(86, 1.73));

/* Ativ2 */
const numeros = [3, 7, 2, 9, 4];

console.log("Maior valor:", Math.max(...numeros));
console.log("Menor valor:", Math.min(...numeros));

const dobro = numeros.map((num) => num * 2);
console.log("Dobro:", dobro);

const maiorQue5 = numeros.filter((num) => num > 5);
console.log("Maiores que 5:", maiorQue5);

/* Ativ3 */

const carro = {
  marca: "Toyota",
  modelo: "Corolla",
  ano: 2020,
  exibirInfo() {
    console.log(
      `Marca: ${this.marca} | Modelo: ${this.modelo} | Ano: ${this.ano}`
    );
  },
};

carro.exibirInfo();

carro.cor = "Preto";

carro.ano = 2025;

console.log("Carro atualizado:", carro);

/* Ativ4 */
class Livro {
  constructor(titulo, autor, ano) {
    this.titulo = titulo;
    this.autor = autor;
    this.ano = ano;
  }

  detalhes() {
    console.log(
      `Livro: ${this.titulo} | Autor: ${this.autor} | Ano: ${this.ano}`
    );
  }
}

const livro1 = new Livro(
  "Harry Potter e o Prisioneiro de Azkaban",
  "J.K. Rowling",
  1999
);
const livro2 = new Livro("Game of Thrones", "George R. R. Martin", 1996);

livro1.detalhes();
livro2.detalhes();

/* Ativ5 */
const palavra = prompt("Digite uma palavra:");
if (palavra) {
  const invertida = palavra.split("").reverse().join("");
  console.log("Quantidade de caracteres:", palavra.length);

  if (palavra.toLowerCase() === invertida.toLowerCase()) {
    console.log("É um palíndromo.");
  } else {
    console.log("Não é um palíndromo.");
  }
} else {
  console.log("Nenhuma palavra foi informada.");
}
