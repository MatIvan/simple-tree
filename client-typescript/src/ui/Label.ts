import { WidgetClickable } from "./core/WidgetClickable";
import { WIDGET_STYLE_LABEL } from "./core/WidgetStyle";

export class Label extends WidgetClickable {

    constructor(text: string) {
        super();
        this.addStyle(WIDGET_STYLE_LABEL);
        this.setText(text);
    }

    protected initRootElement(): HTMLElement {
        return document.createElement("div");
    }

    public getElement(): HTMLDivElement {
        return super.getElement() as HTMLDivElement;
    }

    public setText(text: string) {
        this.getElement().innerText = text;
    }
}