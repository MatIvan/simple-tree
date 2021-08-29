import { UIFabric, UIStyle } from "../../ui/UIFabric";
import { Widget } from "../../ui/Widget";

const STYLE_MAIN = "nodes-tree-item";
const STYLE_UI_CONTAINER = "nodes-tree-item-ui-container";
const STYLE_SELECTED = "nodes-tree-item-selected";

const TEXT_COLLAPSED = "+";
const TEXT_EXPANDEDED = "-";

export class NodesTreeItem extends Widget {
    private _id: number;
    private _isExpand: boolean;
    private _selected: boolean;

    private _itemsContainer: HTMLDivElement;
    private _label: HTMLDivElement;
    private _bnt: HTMLButtonElement;
    private _uiContainer: HTMLDivElement;

    constructor(id: number, name: string) {
        super(STYLE_MAIN);
        this._id = id;
        this._isExpand = false;
        this._selected = false;
        this._build(name);
    }

    private _build(name: string) {
        this.element.onclick = () => {
            this.onClick(this._id);
        };

        this._bnt = UIFabric.getButton(TEXT_COLLAPSED);
        this._bnt.onclick = () => {
            this._togle();
        }

        this._label = UIFabric.getLabel(name);
        this._itemsContainer = UIFabric.getVerticalPanel(UIStyle.hide);
        this._uiContainer = UIFabric.getHorizontalPanel(STYLE_UI_CONTAINER);
        this._uiContainer.append(this._bnt, this._label);

        this.add(this._uiContainer);
        this.add(this._itemsContainer);
    }

    set name(name: string) {
        this._label.innerText = name;
    }

    get id() {
        return this._id;
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
            this.onExpand(this._id);
        } else {
            this._bnt.innerText = TEXT_COLLAPSED;
            this._itemsContainer.classList.toggle(UIStyle.hide);
        }
    }

    addItem(nodesTreeItem: NodesTreeItem) {
        this._itemsContainer.append(nodesTreeItem.asNode());
    }

    onClick: (id: number) => any;

    onExpand: (id: number) => any;

}