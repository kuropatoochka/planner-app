import { selector } from "./constants/constants.js";
import { updateTaskTitleLimit } from "./utils/inputUtils.js";
import { TaskService } from "./utils/taskService.js";
import { createObservableSubject } from "./utils/createObserver.js";
import {updateCounter} from "./utils/taskCounter.js";
import {loadTasksFromLocalStorage, saveTasksToLocalStorage} from "./utils/taskStorageService.js";

const taskSubject = createObservableSubject();
const listOfTasks = loadTasksFromLocalStorage();

document.addEventListener("DOMContentLoaded", () => {
    listOfTasks.forEach(task => task.displayTask());
    updateCounter(listOfTasks.filter(task => !task.isDeleted).length);
});

const taskObserver = {
    update(tasks) {
        selector.tasksWrapper.innerHTML = '';
        tasks.forEach(task => {
            task.displayTask();
        });
        updateCounter(tasks.filter(task => !task.isDeleted).length);
    },
};

taskSubject.subscribe(taskObserver);

function createTaskFromInput() {
    if (!selector.taskText.value.trim()) return;
    const taskId = listOfTasks.length + 1;
    const task = new TaskService(
        taskId,
        selector.taskTitle.value.trim(),
        selector.taskText.value.trim()
    );
    taskSubject.addNewTask(task);
    saveTasksToLocalStorage(taskSubject.getAllTasks());
    taskSubject.notify();
}

const onFilterItemClick = (item) => {
    for (let filterItem of selector.filterItems) {
        filterItem.classList.remove('_active');
    }
    item.classList.add('_active');

    const filter = item.getAttribute('data-filter');
    taskSubject.filterTasksByCriteria(filter);
};

const onCompleteItemClick = (completeIcon) => {
    const taskId = Number(completeIcon.closest('.card').getAttribute('data-task-id'));
    const svgPath = completeIcon.querySelector('path');
    (svgPath.getAttribute('fill') === '#97BDF4') ? svgPath.setAttribute('fill', '#4A4F87') : svgPath.setAttribute('fill', '#97BDF4');
    const task = taskSubject.getAllTasks().find(task => task.taskId === taskId);
    if (task) {
        task.completeTask();
        saveTasksToLocalStorage(taskSubject.getAllTasks());
    }
    updateCounter();
};

const onDeleteItemClick = (deleteIcon) => {
    const taskId = Number(deleteIcon.closest('.card').getAttribute('data-task-id'));
    const task = taskSubject.getAllTasks().find(task => task.taskId === taskId);
    if (task) {
        task.deleteTask();
        saveTasksToLocalStorage(taskSubject.getAllTasks());
    }
    updateCounter();
};

const eventMap = {
    'task-form__button': createTaskFromInput,
    'filter__link': element => onFilterItemClick(element),
    'complete__icon': element => onCompleteItemClick(element),
    'delete__icon': element => onDeleteItemClick(element),
};

document.addEventListener('click', (e) => {
    e.preventDefault();
    const targetClass = Object.keys(eventMap).find(c => e.target.closest(`.${c}`));
    if (targetClass) {
        const targetElement = e.target.closest(`.${targetClass}`);
        eventMap[targetClass](targetElement);
    }
});

selector.taskFormBody.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`;
});

document.getElementById('taskTitle').addEventListener('input', updateTaskTitleLimit);

selector.themeButton.addEventListener("click", () => {
    const root = document.documentElement;
    (root.hasAttribute('data-theme')) ? root.removeAttribute('data-theme') : root.setAttribute('data-theme', 'dark');
});

selector.filterIcon.addEventListener('click', (e) => {
    e.preventDefault();
    selector.filterIcon.classList.toggle('_active');
    const isOpenList = document.querySelector('.filter__list').classList.toggle('_openList');
    selector.filterItems.forEach(item => {
        item.parentElement.style.display = (!isOpenList && !item.classList.contains('_active')) ? 'none' : 'list-item';
    });
});