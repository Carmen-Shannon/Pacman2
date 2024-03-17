export default class WindowEvents {
    static resize(element) {
        element.width = window.innerWidth;
        element.height = window.innerHeight;
    }
}