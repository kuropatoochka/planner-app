import {selector} from "./constants/constants.js";
import {updateTaskTitleLimit} from "./utils/inputUtils.js";
import {listOfTasks, saveTasksToLocalStorage} from "./utils/taskStorageService.js";
import {TaskService} from "./utils/taskService.js";
import {updateCounter} from "./utils/taskCounter.js";

let amountOfTasks = listOfTasks.length;

selector.themeButton.addEventListener("click", () => {
    const root = document.documentElement;
    if (root.hasAttribute('data-theme')) {
        root.removeAttribute('data-theme');
    } else {
        root.setAttribute('data-theme', 'dark');
    }
});

for (let task of listOfTasks) {
    task.createTaskCard();
    updateCounter();
}

function createTaskFromInput() {
    if (!selector.taskText.value.trim()) return;
    amountOfTasks++;
    let task = new TaskService(
        amountOfTasks,
        selector.taskTitle.value.trim(),
        selector.taskText.value.trim());
    task.createTaskCard();
    addTaskToLocalStorage(task);
    updateCounter();
}

function addTaskToLocalStorage(task) {
    listOfTasks.push(task);
    saveTasksToLocalStorage(listOfTasks);
}

const onFilterItemClick = (item) => {
    for (let filterItem of selector.filterItems) {
        filterItem.classList.remove('_active');
    }
    item.classList.add('_active');
    displayFilteredTasks(item);
}

const onCompleteItemClick = (completeIcon) => {
    const task = findTaskById(completeIcon);
    const svgPath = completeIcon.querySelector('path');
    svgPath.setAttribute('fill', task.isCompleted ? '#97BDF4' : '#4A4F87');
    task.completeTask();
    saveTasksToLocalStorage(listOfTasks);
    updateCounter();
}

const onDeleteItemClick = (deleteIcon) => {
    const task = findTaskById(deleteIcon);
    task.deleteTask();
    saveTasksToLocalStorage(listOfTasks);
    updateCounter();
}

const findTaskById = (icon) => {
    const taskId = icon.closest('.card').getAttribute('data-task-id');
    return listOfTasks.find(task => task.taskId === Number(taskId));
}

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

function displayFilteredTasks(selectedFilter) {
    const filterMap = {
        'active-tasks': task => !task.isCompleted && !task.isDeleted,
        'completed-tasks': task => task.isCompleted && !task.isDeleted,
        'deleted-tasks': task => task.isDeleted,
        'all-tasks': task => !task.isDeleted,
    };
    const selectedFilterClass = Object.keys(filterMap).find(cls =>
        selectedFilter.classList.contains(cls)
    );
    selector.tasksWrapper.innerHTML = '';
    listOfTasks.forEach(task => {
        if (filterMap[selectedFilterClass](task)) {
            task.displayTask();
            if (selectedFilterClass === 'deleted-tasks') {
                task.taskCard.classList.remove('_deleted');
            }
        }
    });
}

selector.filterIcon.addEventListener('click', (e) => {
    e.preventDefault();
    selector.filterIcon.classList.toggle('_active');
    const isOpenList = document.querySelector('.filter__list').classList.toggle('_openList');
    selector.filterItems.forEach(item => {
        item.parentElement.style.display = (!isOpenList && !item.classList.contains('_active')) ? 'none' : 'list-item';
    });
});
