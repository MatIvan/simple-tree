import { UIElement } from "./ui-element";

const STYLE = "ui-horizontal-panel";

export class UIHorizontalPanel extends UIElement {
    constructor(style?: string) {
        super(STYLE, style);
    }
}