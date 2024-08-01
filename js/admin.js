const taskTitle = document.getElementById("task-title");
const taskPriority = document.getElementById("task-priority");
const addTask = document.getElementById("addTask");
const taskContainer = document.getElementById("task-container");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//esta funcion la me sirve para guardar la informacion 
function guardarTarea() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function crearTarea(task) {
    //Se crean el elemento div, que va a almacenar los datos de las tareas
    const taskDiv = document.createElement("div");
    taskDiv.classList.add('task');

    //creamos los elementos
    const taskP = document.createElement("p");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    
    //les agregamos id a los botones para poder identificarlos en el futuro
    deleteBtn.id = "deleteTaskBtn";
    editBtn.id = "editTaskBtn";


    taskP.innerText = `${task.title } - Priority: ${task.priority }`; //el parrafo guardado en 
    //taskP va a mostrar el titulo y la prioridad, esto se denomina como template literals
    //la que uso en especifico que es ${} lo que me permite hacer es insertar el valor de una expresion dentro de una cadena
    deleteBtn.innerText = "Delete"; 
    editBtn.innerText = "Edit";

    //se agregan los elementos de parrafo y botones al contenedor de taskDiv
    taskDiv.appendChild(taskP);
    taskDiv.appendChild(editBtn);
    taskDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function () {
        //esta funcion lo que me permite hacer es hacer una validacion si la tarea que quiero
        //eliminar es igual a true lo que va a hacer es eliminar esa tarea
        tasks = tasks.filter(t => t !== task);
        guardarTarea();
        taskDiv.remove();
    });

    //Esta funcion me va a permitir editar las tareas
    editBtn.addEventListener("click", function () {
        const newTitle = prompt("Edit title", task.title);
        const newPriority = prompt("Change the task priority", task.priority);

        //Este If lo que hace es es si en el input hay algo escrito lo que va a hacer es 
        //hacer todo el procedimiento correcto para actualizar la tarea por la nueva agregada por el usuario
        if (newTitle && newPriority) {
            task.title = newTitle;
            task.priority = newPriority;
            taskP.innerText = `${ task.title } - Priority: ${ task.priority }`;
            guardarTarea();
        }
    });
    return taskDiv;
}

//cargar tarea lo que hace es que carga la informacion de las tareas guardadas
//y me permite para eso utilizamos un forEach para ir en cada espacio del objeto, y por medio
//de una variable creada "tarea" va a almacenar los datos de la funcion creartarea(task) para que despues dentro de la 
//taskContainer agrega esa tarea al contenedor 
function cargarTareas() {
    tasks.forEach(task => {
        const tarea = crearTarea(task);
        taskContainer.appendChild(tarea);
    });
}

addTask.addEventListener("click", function () {
    const title = taskTitle.value;
    const priority = taskPriority.value;
    
    if (title && priority) {

        const taskE = tasks.find(task => task.title === title && task.priority === priority);

        if(taskE){

            alert("Esta tarea ya esta registrada")

        }else{

        const newTask = { title, priority };
        tasks.push(newTask);
        const tarea = crearTarea(newTask);
        taskContainer.appendChild(tarea);
        guardarTarea();
        taskTitle.value = "";
        taskPriority.value = "Low";
        }

    }else{
        alert("No se permite agregar datos vacios")
    }
});

cargarTareas();


//esta logica es literalmente igual que la de tareas 
const eventTitle = document.getElementById("event-title");
const eventDate = document.getElementById("event-date");
const addEvent = document.getElementById("addEvent");
const eventContainer = document.getElementById("event-container");

let events = JSON.parse(localStorage.getItem('events')) || [];


function guardarEvento() {
    localStorage.setItem('events', JSON.stringify(events));
}

function crearEvento(event) {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add('event');

    const eventP = document.createElement("p");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    deleteBtn.id = "deleteEventBtn";
    editBtn.id = "editEventBtn";

    eventP.innerText = `${ event.title } - Date: ${ event.date }`;
    deleteBtn.innerText = "Delete";
    editBtn.innerText = "Edit";

    eventDiv.appendChild(eventP);
    eventDiv.appendChild(editBtn);
    eventDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function () {
        events = events.filter(e => e !== event);
        guardarEvento();
        eventDiv.remove();
    });

    editBtn.addEventListener("click", function () {
        const newTitle = prompt("Edit title", event.title);
        const newDate = prompt("Change the event date", event.date);
        if (newTitle && newDate) {
            event.title = newTitle;
            event.date = newDate;
            eventP.innerText = `${ event.title } - Date: ${ event.date }`;
            guardarEvento();
        }
    });
    return eventDiv;
}

function cargarEventos() {
    events.forEach(event => {
        const evento = crearEvento(event);
        eventContainer.appendChild(evento);
    });
}

addEvent.addEventListener("click", function () {
    const title = eventTitle.value;
    const date = eventDate.value;
    if (title && date) {
        const newEvent = { title, date };
        events.push(newEvent);
        const evento = crearEvento(newEvent);
        eventContainer.appendChild(evento);
        guardarEvento();
        eventTitle.value = "";
        eventDate.value = "";
    }else{
        alert("No se permite agregar datos vacios")
    }
});

cargarEventos();