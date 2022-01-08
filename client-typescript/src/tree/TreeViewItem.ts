import { TreeItem } from "./TreeItem";

const STYLE = {
    MAIN: "TreeViewItem",
    NODE_PANEL: "NodePanel",
    CHILD_PANEL: "ChildPanel",
    SELECTED: "selected",
    HIDDEN: "hidden",
}

export class TreeViewItem {

    private _panel: HTMLDivElement;
    private _itemPanel: HTMLDivElement;
    private _childrenPanel: HTMLDivElement;
    private _btn: HTMLButtonElement;
    private _nameLabel: HTMLDivElement;

    private _onClick: () => void;
    private _onBtnClick: () => void;

    constructor(item: TreeItem) {
        this._panel = document.createElement("div") as HTMLDivElement;
        this._panel.classList.add(STYLE.MAIN);

        this._createItemPanel(item.selected);
        this._createBtn(item.expand);
        this._createLabel(item.node.name);
        this._createChildrenPanel(item.expand);

        this._itemPanel.appendChild(this._btn);
        this._itemPanel.appendChild(this._nameLabel);
        this._panel.appendChild(this._itemPanel);
        this._panel.appendChild(this._childrenPanel);
    }

    private _createBtn(isExpand: boolean) {
        this._btn = document.createElement("button");
        this._btn.innerText = isExpand ? "-" : "+";
        this._btn.onclick = () => {
            this._onBtnClick();
        };
    }

    private _createLabel(name: string) {
        this._nameLabel = document.createElement("div");
        this._nameLabel.innerText = name;
        this._nameLabel.onclick = () => {
            this._onClick();
        };
    }

    private _createItemPanel(isSelected: boolean) {
        this._itemPanel = document.createElement("div") as HTMLDivElement;
        this._itemPanel.classList.add(STYLE.NODE_PANEL);
        if (isSelected) {
            this._itemPanel.classList.add(STYLE.SELECTED);
        }
    }

    private _createChildrenPanel(isExpand: boolean) {
        this._childrenPanel = document.createElement("div") as HTMLDivElement;
        this._childrenPanel.classList.add(STYLE.CHILD_PANEL);
        if (!isExpand) {
            this._childrenPanel.classList.add(STYLE.HIDDEN);
        }
    }

    setOnClick(onClick: () => void) {
        this._onClick = onClick;
    }

    setOnBtnClick(onBtnClick: () => void) {
        this._onBtnClick = onBtnClick;
    }

    getElement(): HTMLElement {
        return this._panel;
    }

    getChildrenContainer(): HTMLElement {
        return this._childrenPanel;
    }
}

