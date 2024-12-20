import {TaskService} from "./taskService.js";

export const listOfTasks = loadTasksFromLocalStorage();

export function saveTasksToLocalStorage(tasks) {
    window.localStorage.setItem('listOfTasks', JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(window.localStorage.getItem('listOfTasks') || '[]');
    return tasks.map(task => {
        return new TaskService(task.taskId, task.taskTitle, task.taskText, task.isCompleted, task.isDeleted);
    });
}