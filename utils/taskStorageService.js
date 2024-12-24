import {TaskService} from "./taskService.js";

export function saveTasksToLocalStorage(tasks) {
    window.localStorage.setItem('listOfTasks', JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(window.localStorage.getItem('listOfTasks') || '[]');
    return tasks.map(task => new TaskService(task.taskTitle, task.taskText, task.isCompleted));
}