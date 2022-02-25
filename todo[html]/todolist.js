const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const todoList = document.querySelector(".todoList"); 
const deleteAllBtn = document.querySelector(".footer button"); 

 
inputBox.onkeyup = ()=>{
    let userEnteredValue = inputBox.value; //getting user entered value
    if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
      addBtn.classList.add("active"); //active the add button
    }else{
      addBtn.classList.remove("active"); //unactive the add button
    }
  }
  showTasks();


addBtn.onclick = ()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("new todo item");
    if(getLocalStorage ==null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("new todo item", JSON.stringify(listArr));
    showTasks();
    addBtn.classList.remove("active"); //unactive the add button
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("new todo item");
    if(getLocalStorage ==null){
      listArr = [];
    }else{
      listArr = JSON.parse(getLocalStorage);
    }
    const pendingNumb = document.querySelector(".pendingNumb")
    pendingNumb.textContent = listArr.length;
    if(listArr.length > 0){
      deleteAllBtn.classList.add("active");
    }else{
      deleteAllBtn.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
      newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; > <img class="icon2" src="ico/delete.svg"> </span> </li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index){
  let getLocalStorage = localStorage.getItem("new todo item");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1);
  localStorage.setItem("new todo item", JSON.stringify(listArr));
  showTasks();
} 

deleteAllBtn.onclick = ()=>{
  listArr = [];
  localStorage.setItem("new todo item", JSON.stringify(listArr));
  showTasks();
}