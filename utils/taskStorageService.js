import {TaskService} from "./taskService.js";

export const listOfTasks = loadTasksFromLocalStorage();

export function saveTasksToLocalStorage(tasks) {
    window.localStorage.setItem('listOfTasks', JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
    let tasks = window.localStorage.getItem('listOfTasks');
    tasks = tasks ? JSON.parse(tasks) : [];
    return tasks.map(task => {
        return new TaskService(task.taskId, task.taskTitle, task.taskText, task.isCompleted, task.isDeleted);
    });
}