import {selector} from "./constants/constants.js";
import {resetInput, updateTaskTitleLimit} from "./utils/inputUtils.js";
import {TaskService} from "./utils/taskService.js";
import {createObservableSubject} from "./utils/createObservable.js";
import {loadTasksFromLocalStorage, saveTasksToLocalStorage} from "./utils/taskStorageService.js";
import {filterTasks} from "./utils/filterStrategy.js";
import {updateCounter} from "./utils/taskCounter.js";

const listOfTasks = loadTasksFromLocalStorage();
const tasksObservable = createObservableSubject([]);
let currentFilter = 'all-tasks';

function displayTasks(tasks) {
    selector.tasksWrapper.innerHTML = '';
    const filteredTasks = filterTasks(tasks, currentFilter);
    filteredTasks.forEach(function (task) {
        task.createTask();
        selector.tasksWrapper.prepend(task.taskCard);
    });
    resetInput();
}

tasksObservable.subscribe(saveTasksToLocalStorage);
tasksObservable.subscribe(displayTasks);
tasksObservable.subscribe(() => updateCounter(listOfTasks));

document.addEventListener("DOMContentLoaded", () => {
    tasksObservable.setState(listOfTasks);
});

function toggleTheme() {
    const root = document.documentElement;
    (root.hasAttribute('data-theme')) ? root.removeAttribute('data-theme') : root.setAttribute('data-theme', 'dark');
}

function createTaskFromInput() {
    if (!selector.taskText.value.trim()) return;
    const task = new TaskService(
        selector.taskTitle.value.trim(),
        selector.taskText.value.trim()
    );
    listOfTasks.push(task);
    tasksObservable.setState(listOfTasks);
}

function onCompleteItemClick(completeIcon) {
    const taskId = Number(completeIcon.closest('.card').getAttribute('data-task-id'));
    const task = listOfTasks.find(task => task.taskId === taskId);
    if (task) {
        task.completeTask();
        tasksObservable.setState(listOfTasks);
    }
}

function onDeleteItemClick(deleteIcon) {
    const taskId = Number(deleteIcon.closest('.card').getAttribute('data-task-id'));
    const taskIndex = listOfTasks.findIndex(task => task.taskId === taskId);
    if (taskIndex !== -1) {
        listOfTasks.splice(taskIndex, 1);
        tasksObservable.setState(listOfTasks);
    }
}

function onFilterItemClick(item) {
    for (let filterItem of selector.filterItems) {
        filterItem.classList.remove('_active');
    }
    item.classList.add('_active');
    currentFilter = item.getAttribute('data-filter');
    tasksObservable.setState(listOfTasks);
}

const eventMap = {
    'theme-toggle-button': toggleTheme,
    'task-form__button': createTaskFromInput,
    'filter__link': element => onFilterItemClick(element),
    'complete__icon': element => onCompleteItemClick(element),
    'delete__icon': element => onDeleteItemClick(element),
};

document.addEventListener('click', (e) => {
    e.preventDefault();
    const targetClass = Object.keys(eventMap).find(cls => e.target.closest(`.${cls}`));
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

selector.filterIcon.addEventListener('click', (e) => {
    e.preventDefault();
    selector.filterIcon.classList.toggle('_active');
    const isOpenList = document.querySelector('.filter__list').classList.toggle('_openList');
    selector.filterItems.forEach(item => {
        item.parentElement.style.display = (!isOpenList && !item.classList.contains('_active')) ? 'none' : 'list-item';
    });
});