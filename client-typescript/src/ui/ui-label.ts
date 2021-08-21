import { UIElement } from "./ui-element";

const STYLE = "ui-label";

export class UILabel extends UIElement {
    constructor(text: string, style?: string) {
        super(STYLE);
        this.htmlElement.innerText = text;
        if (style) {
            this.addStyleName(style);
        }
    }
}