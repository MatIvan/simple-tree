import { WidgetClickable } from "./core/WidgetClickable";
import { WIDGET_STYLE_BUTTON } from "./core/WidgetStyle";

export class Button extends WidgetClickable {

    constructor(text: string) {
        super();
        this.addStyle(WIDGET_STYLE_BUTTON);
        this.setText(text);
    }

    protected initRootElement(): HTMLElement {
        return document.createElement("button");
    }

    public getElement(): HTMLButtonElement {
        return super.getElement() as HTMLButtonElement;
    }

    public setText(text: string) {
        this.getElement().innerText = text;
    }

}