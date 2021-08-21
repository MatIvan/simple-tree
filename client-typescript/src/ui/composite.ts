export class Composite {
    private _div: HTMLElement;

    constructor() {
        this._div = document.createElement('div');
    }

    asWidget(): HTMLElement {
        return this._div;
    }

    add(widjet: Composite) {
        this.asWidget().appendChild(widjet.asWidget());
    }

    addStyleName(styelName: string) {
        this._div.classList.add(styelName);
    }
}