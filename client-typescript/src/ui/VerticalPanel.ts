import { WIDGET_STYLE_VERTICAL_PANEL } from "./core/WidgetStyle";
import { SimplePanel } from "./SimplePanel";

export class VerticalPanel extends SimplePanel {
    constructor() {
        super();
        this.addStyle(WIDGET_STYLE_VERTICAL_PANEL);
    }
}
