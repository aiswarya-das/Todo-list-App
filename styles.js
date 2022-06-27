const btn = document.getElementById("add");
const input = document.getElementById("input");
const lst = document.getElementById("ul");

function addList() {
    const main = document.createElement("div")
    main.classList.add("main")

    const dltBtn = document.createElement("button");
    dltBtn.classList.add("dltBtn");
    dltBtn.innerHTML = "❌";
    
    const li = document.createElement("li");
    li.classList.add("listItem");
    const val = input.value;
    input.value = ""
    if (val) {
        li.innerHTML = val;
        SaveTodo(val);
        main.appendChild(li);
        main.appendChild(dltBtn);
    }
    else{
        alert("Enter task!");
    }

    lst.appendChild(main);

    dltBtn.addEventListener('click',function remove(){
        del(main);
        lst.removeChild(main);
    })  
}

function enter(e){

    if (e.key === "Enter") {
        addList();
    }
}

function SaveTodo(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        
        todos = []; //if there is no item present .create empty array
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
        // if item is present , get the items and parse it to an array.
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
                            //stringify used to convert array to string 
}

function del(todo) {
    if (localStorage.getItem('todos') === null) {
        
        todos = []; //if there is no item present .create empty array
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
        // if item is present , get the items and parse it to an array.
    }
    /*here, todo is the parent div . children[0] gives its first child 
    that is li, .innerHTML gives the content of li.
    */
    item = todo.children[0].innerHTML;

     /*todos.indexOf(item) gives the position of the li item
    which we want to remove.
    */
    // splice(position of item,how many items to remove)
    todos.splice(todos.indexOf(item),1); // remove item from array.

    localStorage.setItem("todos",JSON.stringify(todos));
    //setting up the local storage for changes to apply.
}
function load(){

    let todos;

    if (localStorage.getItem('todos') === null) {
        
        todos = []; //if there is no item present .create empty array
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
        // if item is present , get the items and parse it to an array.
    }

    todos.forEach(todo => {
         const main = document.createElement("div")
         main.classList.add("main")

         const dltBtn = document.createElement("button");
         dltBtn.classList.add("dltBtn");
         dltBtn.innerHTML = "❌";
    
         const li = document.createElement("li");
         li.classList.add("listItem");
         li.innerHTML = todo;
         
         main.appendChild(li);
         main.appendChild(dltBtn);
    
        lst.appendChild(main);
        
    });

}
document.addEventListener("DOMContentLoaded",load);
btn.addEventListener("click",addList);
input.addEventListener("keypress",enter);
