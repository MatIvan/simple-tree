import { UIElement } from "./ui-element";
const ELEMENT_TAG = "div";
const STYLE = "ui-vertical-panel";

export class UIVerticalPanel extends UIElement {
    constructor(style?: string) {
        super(ELEMENT_TAG, STYLE, style);
    }
}