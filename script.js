const inputBox = document.getElementById("input-text");
const listcontainer = document.getElementById("list-container");
const addBtn = document.getElementById("add-btn");

let taskBeingEdited = null;

function Addtask() {
    if (inputBox.value === '') {
        alert("Kuch likho");
    } else {
        if (taskBeingEdited) {
            // Save edited task
            taskBeingEdited.childNodes[0].nodeValue = inputBox.value;
            taskBeingEdited = null;
            addBtn.textContent = "Add"; // switch back to Add
        } else {
            // Add new task
            let li = document.createElement("li");
            li.innerHTML = inputBox.value;

            // ✏️ Edit button
            let editBtn = document.createElement("span");
            editBtn.innerHTML = "✏️";
            editBtn.classList.add("edit-btn");
            editBtn.onclick = function () {
                inputBox.value = li.childNodes[0].nodeValue.trim();
                taskBeingEdited = li;
                addBtn.textContent = "Save"; // switch to Save
            };

            // ❌ Delete button
            let deleteBtn = document.createElement("span");
            deleteBtn.innerHTML = "\u00d7";
            deleteBtn.classList.add("delete-btn");

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            listcontainer.appendChild(li);
        }
    }

    inputBox.value = "";
    saveData();
}

listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showTask() {
    listcontainer.innerHTML = localStorage.getItem("data");

    // Reattach Edit functionality
    const allItems = listcontainer.querySelectorAll("li");
    allItems.forEach(li => {
        const editBtn = li.querySelector(".edit-btn");
        if (editBtn) {
            editBtn.onclick = function () {
                inputBox.value = li.childNodes[0].nodeValue.trim();
                taskBeingEdited = li;
                addBtn.textContent = "Save";
            };
        }
    });
}

showTask();



// const inputBox=document.getElementById("input-text");
// const listcontainer=document.getElementById("list-container");

// function Addtask(){
//     if(inputBox.value === ''){
//         alert("kuch likho ");
//     }else{
//         let li=document.createElement("li");
//         li.innerHTML=inputBox.value;
//         listcontainer.appendChild(li);
//         let span=document.createElement("span");
//         span.innerHTML="\u00d7";
//         li.appendChild(span);

//     }
//     inputBox.value="";
//     saveData();
// }
// listcontainer.addEventListener("click",function(e){
//            if(e.target.tagName === "LI"){
//             e.target.classList.toggle("checked");
//             saveData();
//            }else if(e.target.tagName === "SPAN"){
//                e.target.parentElement.remove();
//                saveData();
//            }
// },false);

// function saveData(){
//       localStorage.setItem("data",listcontainer.innerHTML);
// }

// function showTask(){
//       listcontainer.innerHTML=localStorage.getItem("data");
// }
// showTask();
