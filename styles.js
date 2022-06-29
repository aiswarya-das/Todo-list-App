const btn = document.getElementById("add");
const input = document.getElementById("input");
const lst = document.getElementById("ul");

flag = false;

function addList() {
  const main = document.createElement("div");
  main.classList.add("main");

  const check = document.createElement("input");
  check.type = "checkbox";
  check.classList.add("checkbox");

  const dltBtn = document.createElement("button");
  dltBtn.classList.add("dltBtn");
  dltBtn.innerHTML = "❌";

  const li = document.createElement("li");
  li.classList.add("listItem");
  const val = input.value;
  input.value = "";
  if (val) {
    li.innerHTML = val;

    main.appendChild(check);
    main.appendChild(li);
    main.appendChild(dltBtn);
  } else {
    alert("Enter task!");
  }

  lst.appendChild(main);

  SaveTodo(val, flag);

  check.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      // alert("checked");
      flag = true;
    } else {
      // alert("not checked");
      flag = false;
    }
    update(li.innerText, flag);
  });

  dltBtn.addEventListener("click", function remove() {
    del(main);
    lst.removeChild(main);
  });
}

function enter(e) {
  if (e.key === "Enter") {
    addList();
  }
}

function SaveTodo(val, flag) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = []; //if there is no item present .create empty array
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    // if item is present , get the items and parse it to an array.
  }

  todos.push({
    value: val,
    flag: flag,
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  //stringify used to convert array to string
}

function del(todo) {
  if (localStorage.getItem("todos") === null) {
    todos = []; //if there is no item present .create empty array
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    // if item is present , get the items and parse it to an array.
  }
  /*here, todo is the parent div . children[0] gives its first child 
    that is li, .innerHTML gives the content of li.
    */
  item = todo.children[1].innerHTML;

  /*todos.indexOf(item) gives the position of the li item
    which we want to remove.
    */
  // splice(position of item,how many items to remove)
  todos.splice(todos.indexOf(item), 1); // remove item from array.

  localStorage.setItem("todos", JSON.stringify(todos));
  //setting up the local storage for changes to apply.
}

function update(value, flag) {
  //for updating the checkbox when it changes

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  if (flag) {
    //console.log("doing smthg");
    //index = todos[0].value;
    Index = todos.findIndex((obj) => obj.value == value);
    todos[Index].flag = flag; //updating the flag value
    // console.log("index", Index);
    // console.log("value", todos);
  } else {
    //console.log("do nothing");
    //index = todos[0].value;
    Index = todos.findIndex((obj) => obj.value == value);
    todos[Index].flag = flag;
    // console.log("index", Index);
    //  console.log("value", todos);
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

function load() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = []; //if there is no item present .create empty array
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    // if item is present , get the items and parse it to an array.
  }

  todos.forEach((todo) => {
    const main = document.createElement("div");
    main.classList.add("main");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = todo.flag;
    check.classList.add("checkbox");

    const dltBtn = document.createElement("button");
    dltBtn.classList.add("dltBtn");
    dltBtn.innerHTML = "❌";

    const li = document.createElement("li");
    li.classList.add("listItem");
    li.innerHTML = todo.value;
    main.appendChild(check);
    main.appendChild(li);
    main.appendChild(dltBtn);

    lst.appendChild(main);
    check.addEventListener("change", (event) => {
      if (event.currentTarget.checked) {
        // alert("checked");
        flag = true;
      } else {
        // alert("not checked");
        flag = false;
      }
      update(li.innerText, flag);
    });

    dltBtn.addEventListener("click", function remove() {
      del(main);
      lst.removeChild(main);
    });
  });
}

document.addEventListener("DOMContentLoaded", load);
btn.addEventListener("click", addList);
input.addEventListener("keypress", enter);
