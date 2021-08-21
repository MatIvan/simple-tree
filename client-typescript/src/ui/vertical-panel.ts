import { Composite } from './composite'

const STYLE_MAIN = "ui-vertical-panel";

export class VerticalPanel extends Composite {

    constructor() {
        super();
        this.addStyleName(STYLE_MAIN);
    }

}
