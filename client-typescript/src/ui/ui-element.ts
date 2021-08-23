export class UIElement {
    private _element: HTMLElement;

    constructor(tag: string, style: string, additionalStyle?: string) {
        this._element = document.createElement(tag);
        if (style) {
            this._element.className = style;
        }
        if (additionalStyle) {
            this._element.classList.add(additionalStyle);
        }
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

    clear() {
        this._element.innerHTML = "";
    }
}