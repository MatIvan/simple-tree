import { WIDGET_STYLE_HORIZONTAL_PANEL } from "./core/WidgetStyle";
import { SimplePanel } from "./SimplePanel";

export class HorizontalPanel extends SimplePanel {
    constructor() {
        super();
        this.addStyle(WIDGET_STYLE_HORIZONTAL_PANEL);
    }
}
