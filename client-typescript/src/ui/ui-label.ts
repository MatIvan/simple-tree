import { UIElement } from "./ui-element";

const STYLE = "ui-label";

export class UILabel extends UIElement {
    constructor(text: string, style?: string) {
        super(STYLE, style);
        this.htmlElement.innerText = text;
    }
}