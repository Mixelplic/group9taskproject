let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');

// let status = document.getElementById('status');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === '') {
        console.log('failure');
        msg.innerHTML = 'Task cannot be blank';
    } else {
        console.log('success');
        msg.innerHTML = '';
        acceptData();
        add.setAttribute('data-bs-dismiss', 'modal');
        add.click();

    (() => {
        add.setAttribute('data-bs-dismiss', '');
        })();
    }
};

let data = [{}];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
        assignTo: assignTo.value

    });

    localStorage.setItem('data', JSON.stringify(data));

    console.log(data);
    createTasks();
};

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += ` 
            <div id=${y}>
            <span class="small ">Assigned to: ${x.assignTo}</span>
                <span class="fw-bold text-uppercase">${x.text}</span>
                <span class="small ">Due: ${x.date}</span>
                    <p class="desc">${x.description}</p>
    
                <span class="options">
                    <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                    <i onClick="deleteTask(this);createTasks()" class="far fa-trash-alt  "></i>
                </span>
            </div> 
        `);
    });

    resetForm();
};

/* Thinking about putting the status button info here
function show_hide() {
    let click = document.getElementById("list-items");
    if(click.style.display ==="none") {
       click.style.display ="block";
    } else {
       click.style.display ="none";
    } 
 }
*/

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem('data', JSON.stringify(data));
    console.log(data);

};

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    assignTo.value = selectedTask.children[3].innerHTML;

    deleteTask(e);
}


let resetForm = () => {
    textInput.value = '';
    dateInput.value = '';
    textarea.value = '';
    assignTo.value = '';
};

(() => {
    data = JSON.parse(localStorage.getItem('data')) || []
    console.log(data);
    createTasks();
})();

