import "./style.less";
import { TreeViewItem } from "./TreeViewItem";
import { TreeItem } from "./TreeItem";

const STYLE = {
    MAIN: "TreeView",
}

export class TreeView {

    private _panel: HTMLDivElement;

    private _onClick: (item: TreeItem) => void;
    private _onBtnClick: (item: TreeItem) => void;

    constructor() {
        this._panel = document.createElement("div") as HTMLDivElement;
        this._panel.classList.add(STYLE.MAIN);
    }

    draw(rootNodes: TreeItem[]) {
        this._panel.innerHTML = "";
        rootNodes.forEach(item => {
            this.additem(item, this._panel);
        });
    }

    additem(item: TreeItem, container: HTMLElement) {
        let viewItem = new TreeViewItem(item);
        viewItem.setOnClick(() => {
            this._onClick(item);
        });
        viewItem.setOnBtnClick(() => {
            this._onBtnClick(item);
        });
        container.appendChild(viewItem.getElement());

        item.children.forEach(childItem => {
            this.additem(childItem, viewItem.getChildrenContainer());
        });
    }

    setOnClick(onClick: (item: TreeItem) => void) {
        this._onClick = onClick;
    }

    setOnBtnClick(onBtnClick: (item: TreeItem) => void) {
        this._onBtnClick = onBtnClick;
    }

    getRootElement(): HTMLElement {
        return this._panel;
    }
}
