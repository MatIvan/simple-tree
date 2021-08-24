const BASE_TAG = "div";

export class Widget {
    private _element: HTMLDivElement;

    constructor(style?: string) {
        this._element = document.createElement(BASE_TAG);
        if (style) {
            this._element.className = style;
        }
    }

    protected get element(): HTMLDivElement {
        return this.element;
    }

    asNode(): Node {
        return this._element;
    }

    add(child: Widget | Node) {
        let node = child instanceof Widget ? child.asNode() : child;
        this._element.appendChild(node);
    }

    clear() {
        this._element.innerHTML = "";
    }
}