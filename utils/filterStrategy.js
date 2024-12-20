export const filterTasksList = (tasks, filter) => {
    switch (filter) {
        case 'active-tasks':
            return tasks.filter(task => !task.isCompleted && !task.isDeleted);
        case 'completed-tasks':
            return tasks.filter(task => task.isCompleted && !task.isDeleted);
        case 'all-tasks':
            return tasks.filter(task => !task.isDeleted);
        default:
            return tasks;
    }
}
