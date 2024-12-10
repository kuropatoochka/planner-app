export function toggleDarkTheme(...elements) {
    elements.forEach(element => {
        if (Array.isArray(element) || NodeList.prototype.isPrototypeOf(element)) {
            element.forEach(item => item.classList.toggle('_dark'));
        } else if (element) {
            element.classList.toggle('_dark');
        }
    });
}