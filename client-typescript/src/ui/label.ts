import { Composite } from './composite'

const STYLE_MAIN = "ui-label";

export class Label extends Composite {

    constructor(text: string) {
        super();
        this.addStyleName(STYLE_MAIN);
        this.asWidget().innerText = text;
    }

}
