const btn = document.getElementById("add");
const input = document.getElementById("input");
const lst = document.getElementById("ul");

function addList() {
    const main = document.createElement("div")
    main.classList.add("main")

    const dltBtn = document.createElement("button");
    dltBtn.classList.add("dltBtn");
    const text2 = document.createTextNode("❌");
    dltBtn.appendChild(text2);
    

    const li = document.createElement("li");
    const val = document.getElementById("input").value;
    if (val) {
        const text1 = document.createTextNode(val);
        li.appendChild(text1);
        main.appendChild(li);
        main.appendChild(dltBtn);
    }
    else{
        alert("Enter task!");
    }

    lst.appendChild(main);

    dltBtn.addEventListener('click',function remove(){
        lst.removeChild(main);
    })
    
}

function enter(e){

    if (e.key === "Enter") {
        addList();
    }
}

btn.addEventListener("click",addList);
input.addEventListener("keypress",enter);

