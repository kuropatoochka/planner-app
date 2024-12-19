import {TaskService} from "./taskService.js";

export const rawTasks = loadTasksFromLocalStorage()

export function saveTasksToLocalStorage(tasks) {
    window.localStorage.setItem('listOfTasks', JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
    const tasks = window.localStorage.getItem('listOfTasks');
    return tasks ? JSON.parse(tasks) : [];
}

export function deserializeTasks(tasks) {
    return tasks.map(task => {
        const restoredTask = new TaskService(task.taskId, task.taskTitle, task.taskText);
        restoredTask.isCompleted = task.isCompleted;
        restoredTask.isDeleted = task.isDeleted;
        return restoredTask;
    });
}