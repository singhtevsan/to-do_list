document.addEventListener('DOMContentLoaded', function(){
    const storedTasks = JSON.parse(localStorage.getItem('to-do tasks'));
    if(storedTasks){
        storedTasks.forEach((item) => tasks.push(item));
        updateTaskList();
        updateStats();
    }
})

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('to-do tasks', JSON.stringify(tasks));
}

const addTask = () => {
    const task_input = document.getElementById('task-input');
    const text = task_input.value.trim();

    if(text){
        tasks.push({text: text, completed: false});
        task_input.value = "";
        updateTaskList();
        updateStats();
        saveTasks()
    }

};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const task_input = document.getElementById('task-input');
    task_input.value = tasks[index].text;

    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const updateTaskList = () => {

    const task_list = document.getElementById('task-list');
    task_list.innerHTML = '';

    tasks.forEach( (item,index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class='taskItem'>
                <div class="task ${item.completed ? "completed":""} " >
                    <input type="checkbox" class='checkbox' ${item.completed ? 'checked' : ''}/>
                    <p>${item.text}</p>
                </div>
                <div class='icons'>
                    <img src='../img/edit.png' onclick='editTask(${index})' />
                    <img src='../img/bin.png' onclick='deleteTask(${index})' />
                </div>
            </div>
        `;

        listItem.addEventListener('change', function(){
            toggleTaskComplete(index);
        });
        task_list.append(listItem);
    });
};

const updateStats = () => {
    const completedTasks = tasks.filter((item) => {
        return item.completed;
    }).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks/totalTasks) * 100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerHTML = `${completedTasks} / ${totalTasks}`;
    
}

document.getElementById('new-task').addEventListener('click', function(event){
    event.preventDefault();

    addTask();
});

