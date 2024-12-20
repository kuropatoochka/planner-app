import { listOfTasks, saveTasksToLocalStorage } from "./taskStorageService.js";
import { filterTasksList } from "./filterStrategy.js";

export const createObservableSubject = () => {
    let tasks = [...listOfTasks];
    let observers = [];

    const notify = () => {
        saveTasksToLocalStorage(tasks);
        observers.forEach(observer => observer.update(tasks));
    };

    return {
        subscribe: (observer) => {
            observers.push(observer);
        },
        addNewTask: (task) => {
            tasks.push(task);
            notify();

        },
        filterTasksByCriteria(filter) {
            const filteredTasks = filterTasksList(listOfTasks, filter);
            observers.forEach(observer => observer.update(filteredTasks));
        },
        getAllTasks: () => tasks
    };
};
