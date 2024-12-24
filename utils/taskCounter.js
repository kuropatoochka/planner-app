function countCompletedTasks(tasks) {
    const completedTasks = tasks.filter(task => task.isCompleted).length;
    return (tasks.length === 0) ? '0' : `${completedTasks}/${tasks.length}`;
}

export function updateCounter(tasks) {
    const counterElement = document.querySelector('.counter__body');
    counterElement.textContent = countCompletedTasks(tasks);
}