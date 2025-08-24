function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  let li = document.createElement("li");

  // Task text inside span
  let span = document.createElement("span");
  span.textContent = taskText;

  // Mark completed on click
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // Buttons container
  let btns = document.createElement("div");
  btns.className = "task-buttons";

  // Edit button
  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", () => {
    let newText = prompt("Edit your task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
    }
  });

  // Delete button
  let delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "del-btn";
  delBtn.addEventListener("click", () => {
    li.remove();
  });

  btns.appendChild(editBtn);
  btns.appendChild(delBtn);

  li.appendChild(span);
  li.appendChild(btns);

  document.getElementById("taskList").appendChild(li);

  input.value = "";
}






