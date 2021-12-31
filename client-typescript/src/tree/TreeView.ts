import "./style.less";
import { TreeNode } from "../entity/TreeNode";
import { TreeViewItem } from "./TreeViewItem";

const STYLE = {
    MAIN: "TreeView",
}

export class TreeView {

    private _panel: HTMLDivElement;

    test: boolean;

    constructor() {
        this._panel = document.createElement("div") as HTMLDivElement;
        this._panel.classList.add(STYLE.MAIN);

    }

    addNode(node: TreeNode) {
        let item = new TreeViewItem(node);
        this._panel.appendChild(item.getElement());

        item.setOnExpand((nodeId: number) => {
            console.log("EXPAND ", nodeId);
        });

        item.setOnCollapse((nodeId: number) => {
            console.log("Collapse ", nodeId);
        });

        item.setOnClick((nodeId: number) => {
            console.log("CLICK ", nodeId);
            this.test = !this.test;
            item.select(this.test);
        });
    }

    getRootElement(): HTMLElement {
        return this._panel;
    }
}
