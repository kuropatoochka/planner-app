export function createBasicCard({ taskId, taskTitle, taskText, isCompleted, isDeleted }) {
    const taskCard = document.createElement('article');
    taskCard.className = `card main__tasks_card${isCompleted ? ' _completed' : ''}${isDeleted ? ' _deleted' : ''}`;
    taskCard.setAttribute('data-task-id', taskId);
    taskCard.innerHTML = `
        <div class="card__label">
            <h3 class="card__label_title">${taskTitle}</h3>
            <div class="card__label_icons">
                <a class="complete__icon"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1664 3.27446C16.2617 3.37255 16.3399 3.49222 16.3967 3.62665C16.4535 3.76108 16.4876 3.90762 16.4972 4.05791C16.5068 4.20819 16.4916 4.35927 16.4526 4.50251C16.4135 4.64575 16.3513 4.77834 16.2695 4.8927L8.62708 15.5994C8.54139 15.7195 8.43597 15.8169 8.31742 15.8857C8.19888 15.9545 8.06977 15.9931 7.93821 15.9992C7.80664 16.0052 7.67546 15.9785 7.55289 15.9208C7.43032 15.863 7.31902 15.7755 7.22596 15.6637L2.76786 10.3103C2.59392 10.0938 2.49775 9.80402 2.50004 9.50324C2.50233 9.20246 2.60292 8.9148 2.78012 8.70221C2.95733 8.48962 3.19698 8.36911 3.44746 8.36664C3.69794 8.36417 3.93921 8.47993 4.1193 8.689L7.84882 13.1659L14.82 3.39988C14.9849 3.16921 15.2194 3.02659 15.4718 3.00336C15.7243 2.98013 15.9741 3.07666 16.1664 3.27446Z" fill="${isCompleted ? '#4a4f87' : '#97bdf4'}"/>
                </svg></a>
                <a class="delete__icon"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <p class="card__body_text">${taskText}</p>
        </div>
    `;
    return taskCard;
}