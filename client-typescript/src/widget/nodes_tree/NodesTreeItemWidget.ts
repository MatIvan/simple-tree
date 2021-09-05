import { Button } from "../../ui/Button";
import { HorizontalPanel } from "../../ui/HorizontalPanel";
import { Label } from "../../ui/Label";
import { VerticalPanel } from "../../ui/VerticalPanel";
import { TreeItemData } from "./TreeItemData"

const STYLE_MAIN = "nodes-tree-item";
const STYLE_UI_CONTAINER = "nodes-tree-item-ui-container";
const STYLE_SELECTED = "nodes-tree-item-selected";

const TEXT_COLLAPSED = "+";
const TEXT_EXPANDEDED = "-";

export class NodesTreeItemWidget extends VerticalPanel {
    private _data: TreeItemData;
    private _isExpand: boolean;
    private _selected: boolean;

    private _itemsContainer: VerticalPanel;
    private _label: Label;
    private _bnt: Button;
    private _uiContainer: HorizontalPanel;

    constructor(data: TreeItemData) {
        super();
        this.addStyle(STYLE_MAIN);
        this._data = data;
        this._isExpand = false;
        this._selected = false;
        this._build();
    }

    private _build() {
        this._bnt = new Button(TEXT_COLLAPSED);
        this._bnt.setOnClickHandler(() => {
            this._togle();
        });

        this._label = new Label(this._data.name);

        this._itemsContainer = new VerticalPanel();
        this._itemsContainer.hide();

        this._uiContainer = new HorizontalPanel();
        this._uiContainer.addStyle(STYLE_UI_CONTAINER);
        this._uiContainer.add(this._bnt);
        this._uiContainer.add(this._label);
        this._uiContainer.setOnClickHandler(() => {
            this.onClick(this._data);
        });

        this.add(this._uiContainer);
        this.add(this._itemsContainer);
    }

    set selected(isSelect: boolean) {
        this._selected = isSelect;
        if (this._selected) {
            if (!this._uiContainer.getElement().classList.contains(STYLE_SELECTED)) {
                this._uiContainer.getElement().classList.add(STYLE_SELECTED);
            }
        } else {
            this._uiContainer.getElement().classList.remove(STYLE_SELECTED);
        }
    }

    private _togle() {
        this._isExpand = !this._isExpand;
        if (this._isExpand) {
            this._bnt.setText(TEXT_EXPANDEDED);
            this._itemsContainer.show();
            this.onExpand(this._data);
        } else {
            this._bnt.setText(TEXT_COLLAPSED);
            this._itemsContainer.hide();
        }
    }

    addItem(nodesTreeItem: NodesTreeItemWidget) {
        this._itemsContainer.add(nodesTreeItem);
    }

    onClick: (data: TreeItemData) => any;

    onExpand: (data: TreeItemData) => any;

}