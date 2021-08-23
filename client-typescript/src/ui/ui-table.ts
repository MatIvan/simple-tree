import { UIElement } from "./ui-element";
const ELEMENT_TAG = "table";
const TAG_TR = "tr";
const TAG_TD = "td";
const STYLE = "ui-table";

export class UITableTR extends UIElement {
    constructor(style?: string) {
        super(TAG_TR, "", style);
    }

    add(td: UITableTD) {
        super.add(td);
    }
}

export class UITableTD extends UIElement {
    constructor(text: string) {
        super(TAG_TD, "");
        this.htmlElement.innerText = text;
    }
}

export class UITable extends UIElement {
    constructor(style?: string) {
        super(ELEMENT_TAG, STYLE, style);
    }

    add(tr: UITableTR) {
        super.add(tr);
    }
}
