import { UIFabric, UIStyle } from "../../ui/UIFabric";
import { Widget } from "../../ui/Widget";
import { TreeItemData } from "./TreeItemData"

const STYLE_MAIN = "nodes-tree-item";
const STYLE_UI_CONTAINER = "nodes-tree-item-ui-container";
const STYLE_SELECTED = "nodes-tree-item-selected";

const TEXT_COLLAPSED = "+";
const TEXT_EXPANDEDED = "-";

export class NodesTreeItemWidget extends Widget {
    private _data: TreeItemData;
    private _isExpand: boolean;
    private _selected: boolean;

    private _itemsContainer: HTMLDivElement;
    private _label: HTMLDivElement;
    private _bnt: HTMLButtonElement;
    private _uiContainer: HTMLDivElement;

    constructor(data: TreeItemData) {
        super(STYLE_MAIN);
        this._data = data;
        this._isExpand = false;
        this._selected = false;
        this._build();
    }

    private _build() {
        this._bnt = UIFabric.getButton(TEXT_COLLAPSED);
        this._bnt.onclick = () => {
            this._togle();
        }

        this._label = UIFabric.getLabel(this._data.name);
        this._itemsContainer = UIFabric.getVerticalPanel(UIStyle.hide);
        this._uiContainer = UIFabric.getHorizontalPanel(STYLE_UI_CONTAINER);
        this._uiContainer.append(this._bnt, this._label);
        this._uiContainer.onclick = () => {
            this.onClick(this._data);
        };

        this.add(this._uiContainer);
        this.add(this._itemsContainer);
    }

    set selected(isSelect: boolean) {
        this._selected = isSelect;
        if (this._selected) {
            if (!this._uiContainer.classList.contains(STYLE_SELECTED)) {
                this._uiContainer.classList.add(STYLE_SELECTED);
            }
        } else {
            this._uiContainer.classList.remove(STYLE_SELECTED);
        }
    }

    private _togle() {
        this._isExpand = !this._isExpand;
        if (this._isExpand) {
            this._bnt.innerText = TEXT_EXPANDEDED;
            this._itemsContainer.classList.toggle(UIStyle.hide);
            this.onExpand(this._data);
        } else {
            this._bnt.innerText = TEXT_COLLAPSED;
            this._itemsContainer.classList.toggle(UIStyle.hide);
        }
    }

    addItem(nodesTreeItem: NodesTreeItemWidget) {
        this._itemsContainer.append(nodesTreeItem.asNode());
    }

    onClick: (data: TreeItemData) => any;

    onExpand: (data: TreeItemData) => any;

}