import { UIElement } from "./ui-element";

const STYLE = "ui-vertical-panel";

export class UIVerticalPanel extends UIElement {
    constructor(style?: string) {
        super(STYLE, style);
    }
}