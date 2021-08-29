interface UITypeData {
    tag: keyof HTMLElementTagNameMap,
    class: string,
}

export enum UIType {
    VerticalPanel,
    HorizontalPanel,
    Label,
    Table,
    Button,
}

export const UIStyle = {
    hide: "ui-hide",
}

const UITypeMap = new Map<UIType, UITypeData>([
    [UIType.VerticalPanel, { tag: "div", class: "ui-vertical-panel" }],
    [UIType.HorizontalPanel, { tag: "div", class: "ui-horizontal-panel" }],
    [UIType.Label, { tag: "div", class: "ui-label" }],
    [UIType.Table, { tag: "table", class: "ui-table" }],
    [UIType.Button, { tag: "button", class: "ui-button" }],
]);

class UIFabricImpl {

    private _get(type: UIType, style?: string): HTMLElement {
        let data = UITypeMap.get(type);
        let elem = document.createElement(data.tag);
        elem.className = data.class;
        if (style) {
            elem.classList.add(style);
        }
        return elem;
    }

    getVerticalPanel(style?: string): HTMLDivElement {
        return this._get(UIType.VerticalPanel, style) as HTMLDivElement;
    }

    getHorizontalPanel(style?: string): HTMLDivElement {
        return this._get(UIType.HorizontalPanel, style) as HTMLDivElement;
    }

    getLabel(text: string, style?: string): HTMLDivElement {
        let el: HTMLDivElement = this._get(UIType.Label, style) as HTMLDivElement;
        el.innerText = text;
        return el;
    }

    getTable(style?: string): HTMLTableElement {
        return this._get(UIType.Table, style) as HTMLTableElement;
    }

    getButton(text: string, style?: string): HTMLButtonElement {
        let el: HTMLButtonElement = this._get(UIType.Button, style) as HTMLButtonElement;
        el.innerText = text;
        return el;
    }
}

export const UIFabric = new UIFabricImpl();
