import { WidgetClickable } from "./core/WidgetClickable";
import { WIDGET_STYLE_SIMPLE_PANEL } from "./core/WidgetStyle";

export class SimplePanel extends WidgetClickable {

    constructor() {
        super();
        this.addStyle(WIDGET_STYLE_SIMPLE_PANEL);
    }

    protected initRootElement(): HTMLElement {
        return document.createElement("div");
    }

    public getElement(): HTMLDivElement {
        return super.getElement() as HTMLDivElement;
    }

}