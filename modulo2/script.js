const displayResult = document.querySelector(".display-result"); // Manipular as Operações
const displayCurrent = document.querySelector(".display-current"); // Manipular os dígitos da vez
const buttons = document.querySelectorAll(".btn"); // Manipular os botões
const historyBtn = document.querySelector(".historical"); // Manipular o histórico

let currentInput = "0"; // Numero do imput atual
let expression = ""; // equação completa
let history = []; // historico

function updateDisplay() {
  // Atualiza o display
  displayCurrent.textContent = currentInput || "0";
  displayResult.textContent = expression;
}

function clearAll() {
  // Limpar tudo
  currentInput = "0";
  expression = "";
  updateDisplay();
}

function clearEntry() {
  // Limpar todo o imput
  currentInput = "0";
  updateDisplay();
}

function backspace() {
  // Apagar o ultimo digito
  if (currentInput.length <= 1 || currentInput === "Erro") {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

function appendNumber(number) {
  // Adiciona o numero ao display de input
  if (currentInput === "0" && number !== ".") {
    currentInput = number;
  } else if (number === "." && currentInput.includes(".")) {
    return;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function chooseOperation(op) {
  // Adiciona o operador na equação
  if (currentInput === "") return;
  expression += `${currentInput} ${op} `;
  currentInput = "";
  updateDisplay();
}

function compute() {
  // Calcula toda a equação usando Try Catch
  expression += currentInput;
  try {
    const result = eval(expression.replace(/\^/g, "**"));
    addToHistory(`${expression} = ${result}`);
    currentInput = result.toString();
  } catch (error) {
    currentInput = "Erro";
  }
  expression = "";
  updateDisplay();
}

function invertSign() {
  // operador de inverter o sinal
  if (currentInput) {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
  }
}

function percentage() {
  //Operador de porcento
  if (currentInput && expression) {
    const parts = expression.trim().split(" ");
    if (parts.length >= 2) {
      const base = parseFloat(parts[parts.length - 2]);
      const percent = (base * parseFloat(currentInput)) / 100;
      currentInput = percent.toString();
      updateDisplay();
    }
  }
}

function squareRoot() {
  // Operador de raiz quadrada
  if (currentInput && parseFloat(currentInput) >= 0) {
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    addToHistory(`√(${displayCurrent.textContent}) = ${currentInput}`);
    updateDisplay();
  }
}

function inverse() {
  // Operador Inverso
  if (currentInput && parseFloat(currentInput) !== 0) {
    currentInput = (1 / parseFloat(currentInput)).toString();
    addToHistory(`1/(${displayCurrent.textContent}) = ${currentInput}`);
    updateDisplay();
  }
}

function addToHistory(entry) {
  // Função que adiciona a equação ao histórico (aside)
  history.push(entry);
  const historyBox = document.getElementById("history-box");
  if (historyBox) {
    const item = document.createElement("li");
    item.textContent = entry;
    item.classList.add("history-entry");
    item.addEventListener("click", () => {
      loadHistoryResult(entry);
    });
    historyBox.appendChild(item);
  }
}

function loadHistoryResult(entry) {
  // Função que carrega o histórico
  const parts = entry.split(" = ");
  if (parts.length === 2) {
    const result = parts[1].trim();
    if (!isNaN(result)) {
      currentInput = result;
      expression = "";
      updateDisplay();
    }
  }
}

historyBtn.addEventListener("click", () => {
  // Evento de clicar no iconde do histórico
  const historyContainer = document.getElementById("history-container");
  historyContainer.classList.toggle("visible");
});

buttons.forEach((btn) => {
  // Eventos de clique de cada número ou operador
  btn.addEventListener("click", () => {
    const id = btn.id;
    if (btn.classList.contains("btn-num")) {
      if (id === "point") appendNumber(".");
      else if (id === "invert") invertSign();
      else appendNumber(btn.textContent.trim());
    } else if (btn.classList.contains("btn-op")) {
      switch (id) {
        case "plus":
          chooseOperation("+");
          break;
        case "minus":
          chooseOperation("-");
          break;
        case "times":
          chooseOperation("*");
          break;
        case "divided":
          chooseOperation("/");
          break;
        case "expo":
          chooseOperation("^");
          break;
        case "sqr":
          squareRoot();
          break;
        case "porcent":
          percentage();
          break;
        case "one":
          inverse();
          break;
        case "ce":
          clearEntry();
          break;
        case "c":
          clearAll();
          break;
        default:
          break;
      }
    } else if (id === "equal") {
      compute();
    } else if (id === "backspace") {
      backspace();
    }
  });
});

updateDisplay(); // Atualiza sempre o display ao iniciar
