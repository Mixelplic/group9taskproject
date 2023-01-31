let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');
let assignedto = document.getElementById('assignedto'); 
let current_status = document.getElementById('status'); 


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
        assignedto: assignedto.value,
        current_status: current_status.value
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
                <span class="fw-bold text-uppercase">${x.text}</span>
                <span class="small
                text-primary">Assigned to: ${x.assignedto}</span>
                <span class="small
                text-secondary">${x.date}</span>
                    <p class="desc">${x.description}</p>
                    <p>${x.current_status}</p>
    
                <span class="options">
                    <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                    <i onClick="deleteTask(this);createTasks()" class="far fa-trash-alt  "></i>
                </span>
            </div> 
        `);
    });
    
    resetForm();
};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem('data', JSON.stringify(data));
    console.log(data);

};

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    assignedto.value = selectedTask.children[1].innerHTML; 
    dateInput.value = selectedTask.children[2].innerHTML;
    textarea.value = selectedTask.children[3].innerHTML;
    current_status.value = selectedTask.children[4].innerHTML;


    deleteTask(e);
}

let resetForm = () => {
    textInput.value = '';
    dateInput.value = '';
    textarea.value = '';
    assignedto.value = '';
    current_status.value = ''; 
};

(() => {
    data = JSON.parse(localStorage.getItem('data')) || []
    console.log(data);
    createTasks();
})();

