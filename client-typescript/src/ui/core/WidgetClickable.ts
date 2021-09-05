import { Widget } from "./Widget"

export abstract class WidgetClickable extends Widget {

    constructor() {
        super();
    }

    setOnClickHandler(handler: () => any) {
        this.getElement().onclick = handler;
    }
}