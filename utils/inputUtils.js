import {selector} from "../constants/constants.js";

export function updateTaskTitleLimit() {
    const maxLength = 25;
    const currentLength = this.value.length;
    if (currentLength > maxLength) {
        this.value = this.value.substring(0, maxLength);
    }
    selector.taskFormTitleLimit.textContent = `символов: ${this.value.length}/${maxLength}`;
    (this.value.length === maxLength) ? selector.taskFormTitleLimit.classList.add('_limit') : selector.taskFormTitleLimit.classList.remove('_limit');
}