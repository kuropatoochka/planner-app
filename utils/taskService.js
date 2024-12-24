import { createBasicCard } from "../components/TaskCard/TaskCard.js";

export class TaskService {
    static lastTaskId = 0;
    constructor(taskTitle, taskText, isCompleted = false) {
        this.taskCard = null;
        this.taskId = TaskService.lastTaskId++;
        this.taskTitle = taskTitle || '';
        this.taskText = taskText || '';
        this.isCompleted = isCompleted;
    }
    createTask() {
        this.taskCard = createBasicCard(this);
    }
    completeTask() {
        this.isCompleted = !this.isCompleted;
        this.taskCard?.classList.toggle('_completed');
        const svgPath = this.taskCard.querySelector('path');
        if (svgPath.getAttribute('fill') === `#97bdf4`) {
            svgPath.setAttribute('fill', `#4a4f87`);
        } else {
            svgPath.setAttribute('fill', `#97bdf4`);
        }
    }

}
