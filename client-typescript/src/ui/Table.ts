import { Widget } from "./core/Widget";
import { WIDGET_STYLE_TABLE } from "./core/WidgetStyle";

export class Table extends Widget {

    constructor() {
        super();
        this.addStyle(WIDGET_STYLE_TABLE);
    }

    protected initRootElement(): HTMLElement {
        return document.createElement("table");
    }

    public getElement(): HTMLTableElement {
        return super.getElement() as HTMLTableElement;
    }

}