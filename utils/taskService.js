import { selector } from "../constants/constants.js";
import { resetInput } from "./inputUtils.js";
import { createBasicCard } from "../components/TaskCard/TaskCard.js";

export class TaskService {
    constructor(taskId, taskTitle, taskText, isCompleted = false, isDeleted = false) {
        this.taskCard = null;
        this.taskId = taskId;
        this.taskTitle = taskTitle || '';
        this.taskText = taskText || '';
        this.isCompleted = isCompleted;
        this.isDeleted = isDeleted;
    }

    displayTask() {
        this.taskCard = createBasicCard(this);
        selector.tasksWrapper.prepend(this.taskCard);
        resetInput();
    }

    completeTask() {
        this.isCompleted = !this.isCompleted;
        this.taskCard?.classList.toggle('_completed');
    }

    deleteTask() {
        this.isDeleted = !this.isDeleted;
        this.taskCard?.classList.add('_deleted');
    }
}
