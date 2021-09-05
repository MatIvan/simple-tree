import '../../style/widget.css';
import { WIDGET_STYLE_HIDE } from "./WidgetStyle";

export abstract class Widget {
    private parent: Widget;
    private children: Widget[] = [];

    private element: HTMLElement;

    constructor() {
        this.element = this.initRootElement();
    }

    protected abstract initRootElement(): HTMLElement;

    public getElement(): HTMLElement {
        return this.element;
    }

    protected setParent(parent: Widget) {
        this.parent = parent;
    }

    public getParent(): Widget {
        return this.parent;
    }

    public add(widget: Widget): void {
        this.element.appendChild(widget.getElement());
        this.children.push(widget);
        widget.setParent(this);
    }

    public remove(widget: Widget): void {
        this.element.removeChild(widget.getElement());
        const componentIndex = this.children.indexOf(widget);
        this.children.splice(componentIndex, 1);
        widget.setParent(null);
    }

    public clear(): void {
        this.children.forEach(child => {
            this.element.removeChild(child.getElement());
            child.setParent(null);
        });
        this.children = [];
    }

    public addStyle(style: string): void {
        this.element.classList.add(style);
    }

    public hide(): void {
        if (this.isVisible()) {
            this.element.classList.add(WIDGET_STYLE_HIDE);
        }
    }

    public show(): void {
        if (!this.isVisible()) {
            this.element.classList.remove(WIDGET_STYLE_HIDE);
        }
    }

    public isVisible(): boolean {
        return !this.element.classList.contains(WIDGET_STYLE_HIDE);
    }
}
