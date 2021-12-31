import { TreeNode } from "../entity/TreeNode";
import { TreeItem } from "./TreeItem";

const STYLE = {
    MAIN: "TreeViewItem",
    NODE_PANEL: "NodePanel",
    CHILD_PANEL: "ChildPanel",
    SELECTED: "selected",
    HIDDEN: "hidden",
}

export type OnNodeEvent = (nodeId: number) => void;

export class TreeViewItem {

    private _item: TreeItem;
    private _panel: HTMLDivElement;
    private _nodePanel: HTMLDivElement;
    private _childrenPanel: HTMLDivElement;
    private _btn: HTMLButtonElement;
    private _nameLabel: HTMLDivElement;

    private _onExpand: OnNodeEvent;
    private _onCollapse: OnNodeEvent;
    private _onClick: OnNodeEvent;

    constructor(node: TreeNode) {
        this._item = {
            node: node,
            expand: false,
            selected: false,
            children: [],
        }

        this._panel = document.createElement("div") as HTMLDivElement;
        this._panel.classList.add(STYLE.MAIN);

        this._nodePanel = document.createElement("div") as HTMLDivElement;
        this._nodePanel.classList.add(STYLE.NODE_PANEL);

        this._btn = document.createElement("button");
        this._btn.innerText = "+";
        this._btn.onclick = () => {
            this._toggleExpand();
        };

        this._nameLabel = document.createElement("div");
        this._nameLabel.innerText = node.name;
        this._nameLabel.onclick = () => {
            this._onClick(node.id);
        };

        this._nodePanel.appendChild(this._btn);
        this._nodePanel.appendChild(this._nameLabel);

        this._childrenPanel = document.createElement("div") as HTMLDivElement;
        this._childrenPanel.classList.add(STYLE.CHILD_PANEL);
        this._childrenPanel.classList.add(STYLE.HIDDEN);

        this._panel.appendChild(this._nodePanel);
        this._panel.appendChild(this._childrenPanel);
    }

    private _toggleExpand() {
        if (this._item.expand) {
            this._item.expand = false;
            this._btn.innerText = "+";
            this._setStyle(this._childrenPanel, STYLE.HIDDEN);
            this._onCollapse(this._item.node.id);
        } else {
            this._item.expand = true;
            this._btn.innerText = "-";
            this._childrenPanel.classList.remove(STYLE.HIDDEN);
            this._onExpand(this._item.node.id);
        }
    }

    setOnExpand(onExpand: OnNodeEvent) {
        this._onExpand = onExpand;
    }

    setOnCollapse(onCollapse: OnNodeEvent) {
        this._onCollapse = onCollapse;
    }

    setOnClick(onClick: OnNodeEvent) {
        this._onClick = onClick;
    }

    select(isSelected: boolean) {
        this._item.selected = isSelected;
        if (isSelected) {
            this._nodePanel.classList.remove(STYLE.SELECTED);
        } else {
            this._setStyle(this._nodePanel, STYLE.SELECTED);
        }
    }

    private _setStyle(element: HTMLElement, style: string) {
        if (!element.classList.contains(style)) {
            element.classList.add(style);
        }
    }

    getElement(): HTMLElement {
        return this._panel;
    }
}

