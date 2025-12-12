const taskBox = document.querySelector(".task-box");
const inputText = document.querySelector("#text");
const addText = document.querySelector(".add-text");
const addTextBtn = document.querySelector("#add-text-btn");
const popup = document.querySelector("#popup");
const popupClose = document.querySelector("#popup-close");

addTextBtn.addEventListener('click', ()=>{
  // if input is empty
  let textValue = inputText.value.trim();

  if(textValue === ""){
    popup.style.display = "flex";
    return;
  }

  const li = document.createElement("li");
  li.classList.add("task");

  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  const icon = document.createElement("img");
  icon.src = "./src/unchecked.png"
  icon.classList.add("check-icon");

  const span = document.createElement("span")
  span.textContent = textValue;
  span.classList.add("task-text");

  // append icon+span to taskcontent
  taskContent.appendChild(icon);
  taskContent.appendChild(span);

  // remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✖";
  removeBtn.classList.add("remove-task");

  li.append(taskContent , removeBtn);

  taskBox.appendChild(li);

  inputText.value = "";

  // saveData
  saveData();
});

popupClose.addEventListener("click", () => {
  popup.style.display = "none"; // hide popup
});

taskBox.addEventListener('click' , (e) =>{
  if(e.target.classList.contains("check-icon")){
    const parent = e.target.closest(".task-content");
    parent.classList.toggle("checked");

    if(parent.classList.contains("checked")){
      e.target.src = "./src/checked.png";
      saveData();
    }
    else{
      e.target.src = "./src/unchecked.png";
      saveData();
    }
  }

  // to remove a task
  if(e.target.classList.contains("remove-task")){
    e.target.closest(".task").remove();
    saveData();
  }
});

// Local storage
function saveData(){
  localStorage.setItem("data" , taskBox.innerHTML);
}
function showTask(){
  taskBox.innerHTML = localStorage.getItem("data");
}

showTask();