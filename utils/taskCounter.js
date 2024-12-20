import {listOfTasks} from "./taskStorageService.js";

function countCompletedTasks(tasks) {
    const completedTasks = tasks.filter(task => task.isCompleted && !task.isDeleted).length;
    const activeTasks = tasks.filter(task => !task.isDeleted).length;
    return (activeTasks === 0) ? '0' : `${completedTasks}/${activeTasks}`;
}

export function updateCounter() {
    const counterElement = document.querySelector('.counter__body');
    counterElement.textContent = countCompletedTasks(listOfTasks);
}