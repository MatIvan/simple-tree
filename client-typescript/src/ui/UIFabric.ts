
export const UIStyle = {
    hide: "ui-hide",
};

interface UITypeData {
    tag: keyof HTMLElementTagNameMap,
    class: string,
}

type UIType =
    "VerticalPanel" |
    "HorizontalPanel" |
    "Label" |
    "Table" |
    "Button";

const UITypeRecord: Record<UIType, UITypeData> = {
    VerticalPanel: { tag: "div", class: "ui-vertical-panel" },
    HorizontalPanel: { tag: "div", class: "ui-horizontal-panel" },
    Label: { tag: "div", class: "ui-label" },
    Table: { tag: "table", class: "ui-table" },
    Button: { tag: "button", class: "ui-button" },
};

class UIFabricImpl {

    private _get(data: UITypeData): HTMLElement {
        let elem = document.createElement(data.tag);
        elem.className = data.class;
        return elem;
    }

    getVerticalPanel(): HTMLDivElement {
        return this._get(UITypeRecord.VerticalPanel) as HTMLDivElement;
    }

    getHorizontalPanel(): HTMLDivElement {
        return this._get(UITypeRecord.HorizontalPanel) as HTMLDivElement;
    }

    getLabel(text: string): HTMLDivElement {
        let el: HTMLDivElement = this._get(UITypeRecord.Label) as HTMLDivElement;
        el.innerText = text;
        return el;
    }

    getTable(): HTMLTableElement {
        return this._get(UITypeRecord.Table) as HTMLTableElement;
    }

    getButton(text: string): HTMLButtonElement {
        let el: HTMLButtonElement = this._get(UITypeRecord.Button) as HTMLButtonElement;
        el.innerText = text;
        return el;
    }
}

export const UIFabric = new UIFabricImpl();
