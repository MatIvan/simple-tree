import { UIElement } from "./ui-element";
const ELEMENT_TAG = "div";
const STYLE = "ui-label";

export class UILabel extends UIElement {
    constructor(text: string, style?: string) {
        super(ELEMENT_TAG, STYLE, style);
        this.htmlElement.innerText = text;
    }
}