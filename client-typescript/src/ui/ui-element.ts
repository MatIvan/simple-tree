export class UIElement {
    private _element: HTMLElement;

    constructor(style: string) {
        this._element = document.createElement("div");
        this._element.className = style;
    }

    protected get htmlElement(): HTMLElement {
        return this._element;
    }

    addStyleName(style: string) {
        this._element.classList.add(style);
    }

    add(child: UIElement) {
        this._element.appendChild(child.htmlElement);
    }

    go(htmlElement: HTMLElement) {
        htmlElement.appendChild(this._element);
    }
}