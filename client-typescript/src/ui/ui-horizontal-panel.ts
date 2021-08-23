import { UIElement } from "./ui-element";

const ELEMENT_TAG = "div";
const STYLE = "ui-horizontal-panel";

export class UIHorizontalPanel extends UIElement {
    constructor(style?: string) {
        super(ELEMENT_TAG, STYLE, style);
    }
}