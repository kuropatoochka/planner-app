export const filterTasks = (tasks, filter) => {
    switch (filter) {
        case 'active-tasks':
            return tasks.filter(task => !task.isCompleted);
        case 'completed-tasks':
            return tasks.filter(task => task.isCompleted);
        default:
            return tasks;
    }
}
