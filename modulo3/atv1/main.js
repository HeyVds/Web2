const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText) {
    const li = document.createElement("li");
    const textNode = document.createTextNode(taskText);
    const button = document.createElement("button");

    button.textContent = "Remover";
    button.className = "delete-button";

    button.addEventListener("click", function () {
      taskList.removeChild(li);
    });

    li.className = "task-item";
    li.appendChild(textNode);
    li.appendChild(button);
    taskList.appendChild(li);

    taskInput.value = "";
  }
});
