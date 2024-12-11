import {selector} from "./constants/constants.js";
import {toggleDarkTheme} from "./utils/darkTheme.js";
import {updateTaskTitleLimit} from "./utils/inputUtils.js";

const listOfTasks = loadTasksFromLocalStorage();
let amountOfTasks = listOfTasks.length;

selector.themeButton.addEventListener("click", () => {
    toggleDarkTheme(
        document.body,
        document.querySelector('.header__logo'),
        selector.themeButton,
        selector.tooltipMessage,
        selector.taskFormInput,
        selector.taskButton,
        selector.filterItems,
        selector.filterIcon,
        selector.counter,
        selector.taskFormTitleLimit,
        selector.tasksWrapper,
        document.querySelectorAll('.card__label_title, .card__body_text')
    );
});

document.getElementById('taskTitle').addEventListener('input', updateTaskTitleLimit);

selector.taskFormBody.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`;
});

function Task(taskId, taskTitle, taskText) {
    this.taskId = taskId;
    this.taskTitle = taskTitle || '';
    this.taskText = taskText || '';
    this.isCompleted = false;
    this.isDeleted = false;
}

listOfTasks.forEach(task => {
    displayTask(task);
    updateCounter();
});

function createTask() {
    amountOfTasks++;
    if (!selector.taskText.value.trim()) return;
    let task = new Task(amountOfTasks, selector.taskTitle.value.trim(), selector.taskText.value.trim());
    listOfTasks.push(task);
    displayTask(task);
    saveTasksToLocalStorage(listOfTasks);
    updateCounter();
}

selector.taskButton.addEventListener('click', (e) => {
    e.preventDefault();
    createTask();
});

function displayTask(task) {
    const taskCard = createTaskCard(task);
    addTaskEvents(taskCard, task);
    resetForm();
    selector.tasksWrapper.prepend(taskCard);
    return taskCard;
}

function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('card', 'main__tasks_card');
    if (task.isCompleted) taskCard.classList.add('_completed');
    if (task.isDeleted) taskCard.classList.add('_deleted');

    taskCard.innerHTML = `
        <div class="card__label">
            <h3 class="card__label_title">${task.taskTitle}</h3>
            <div class="card__label_icons">
             <a href="" class="complete__icon"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1664 3.27446C16.2617 3.37255 16.3399 3.49222 16.3967 3.62665C16.4535 3.76108 16.4876 3.90762 16.4972 4.05791C16.5068 4.20819 16.4916 4.35927 16.4526 4.50251C16.4135 4.64575 16.3513 4.77834 16.2695 4.8927L8.62708 15.5994C8.54139 15.7195 8.43597 15.8169 8.31742 15.8857C8.19888 15.9545 8.06977 15.9931 7.93821 15.9992C7.80664 16.0052 7.67546 15.9785 7.55289 15.9208C7.43032 15.863 7.31902 15.7755 7.22596 15.6637L2.76786 10.3103C2.59392 10.0938 2.49775 9.80402 2.50004 9.50324C2.50233 9.20246 2.60292 8.9148 2.78012 8.70221C2.95733 8.48962 3.19698 8.36911 3.44746 8.36664C3.69794 8.36417 3.93921 8.47993 4.1193 8.689L7.84882 13.1659L14.82 3.39988C14.9849 3.16921 15.2194 3.02659 15.4718 3.00336C15.7243 2.98013 15.9741 3.07666 16.1664 3.27446Z" fill="${task.isCompleted ? '#4A4F87' : '#97BDF4'}"/>
                </svg></a>
             <a href="" class="delete__icon"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_58_169)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 10C1.5 9.73478 1.59482 9.48043 1.7636 9.29289C1.93239 9.10536 2.16131 9 2.4 9H15.6C15.8387 9 16.0676 9.10536 16.2364 9.29289C16.4052 9.48043 16.5 9.73478 16.5 10C16.5 10.2652 16.4052 10.5196 16.2364 10.7071C16.0676 10.8946 15.8387 11 15.6 11H2.4C2.16131 11 1.93239 10.8946 1.7636 10.7071C1.59482 10.5196 1.5 10.2652 1.5 10Z" fill="#97BDF4"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_58_169">
                            <rect width="16" height="16" fill="white" transform="translate(1.5 1.5)"/>
                        </clipPath>
                    </defs>
                </svg></a>         
            </div>
        </div>
        <div class="card__body">
            <p class="card__body_text">${task.taskText}</p>
        </div>`;
    return taskCard;
}

function addTaskEvents(taskCard, task) {
    const completeIcon = taskCard.querySelector('.complete__icon');
    const deleteIcon = taskCard.querySelector('.delete__icon');
    const svgPath = completeIcon.querySelector('path');

    completeIcon.addEventListener('click', (e) => {
        e.preventDefault();
        completeTask(taskCard, task);
        svgPath.setAttribute('fill', task.isCompleted ? '#4A4F87' : '#97BDF4');
    });

    deleteIcon.addEventListener('click', (e) => {
        e.preventDefault();
        deleteTask(taskCard, task);
    });
}

function resetForm() {
    selector.taskTitle.value = '';
    selector.taskText.value = '';
    selector.taskText.style.height = 'auto';
}

function completeTask(cardElement, task) {
    task.isCompleted = !task.isCompleted;
    cardElement.classList.toggle('_completed');
    saveTasksToLocalStorage(listOfTasks);
    updateCounter();
}

function deleteTask(cardElement, task) {
    task.isDeleted = !task.isDeleted;
    cardElement.classList.add('_deleted');
    saveTasksToLocalStorage(listOfTasks);
    updateCounter();
}

function saveTasksToLocalStorage(tasks) {
    window.localStorage.setItem('listOfTasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = window.localStorage.getItem('listOfTasks');
    return tasks ? JSON.parse(tasks) : [];
}

function countCompletedTasks(tasks) {
    const completedTasks = tasks.filter(task => task.isCompleted && !task.isDeleted).length;
    const activeTasks = tasks.filter(task => !task.isDeleted).length;
    return (activeTasks === 0) ? '0' : `${completedTasks}/${activeTasks}`;
}

function updateCounter() {
    const counterElement = document.querySelector('.counter__body');
    counterElement.textContent = countCompletedTasks(listOfTasks);
}

selector.filterItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        for (let item of selector.filterItems) {
            item.classList.remove('_active');
        }
        item.classList.add('_active');
        displayFilteredTasks(item);
    });
});
selector.filterIcon.addEventListener('click', (e) => {
    e.preventDefault();
    selector.filterIcon.classList.toggle('_active');
    const isOpenList = document.querySelector('.filter__list').classList.toggle('_openList');
    selector.filterItems.forEach(item => {
        item.parentElement.style.display = (!isOpenList && !item.classList.contains('_active')) ? 'none' : 'list-item';
    });
});
function displayFilteredTasks(selectedFilter) {
    selector.tasksWrapper.innerHTML = '';

    listOfTasks.forEach(task => {
        if (selectedFilter.classList.contains('active-tasks')) {
            if (!task.isCompleted && !task.isDeleted) {
                displayTask(task);
            }
        } else if (selectedFilter.classList.contains('completed-tasks')) {
            if (task.isCompleted && !task.isDeleted) {
                displayTask(task);
            }
        } else if (selectedFilter.classList.contains('deleted-tasks')) {
            if (task.isDeleted) {
                const taskCard = displayTask(task);
                taskCard.classList.remove('_deleted');
            }
        } else if (selectedFilter.classList.contains('all-tasks')) {
            if (!task.isDeleted) {
                displayTask(task);
            }
        }
    });
}