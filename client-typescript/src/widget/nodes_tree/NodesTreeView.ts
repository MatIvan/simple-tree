import '../../style/nodes-tree.css';
import { Widget } from "../../ui/Widget";
import { NodesTreeDisplay } from "./NodesTreeDisplay";
import { NodesTreeItemWidget } from './NodesTreeItemWidget';
import { UIFabric } from '../../ui/UIFabric';
import { TreeItemData } from './TreeItemData';

const STYLE_MAIN = "nodes-tree";

export class NodesTreeView extends Widget implements NodesTreeDisplay {

    private _nodeMap: Map<number, NodesTreeItemWidget>;// key nodeId
    private _selectedNodeId: number;

    constructor() {
        super(STYLE_MAIN);
        this._nodeMap = new Map<number, NodesTreeItemWidget>();
    }

    addNodes(parentId: number, treeItemData: TreeItemData[]): void {
        treeItemData.forEach(treeItemData => {
            if (!this._nodeMap.has(treeItemData.id)) {
                let newItem = this._makeItem(treeItemData);
                let parentItem: NodesTreeItemWidget = this._nodeMap.get(parentId);
                if (parentItem) {
                    parentItem.addItem(newItem);
                } else {
                    this.add(newItem);
                }
            };
        });
    }

    removeNodes(itemIdList: number[]) {
        itemIdList.forEach(itemid => {
            let item: NodesTreeItemWidget = this._nodeMap.get(itemid);
            if (item) {
                item.element.parentNode.removeChild(item.element);
                this._nodeMap.delete(itemid);
            }
        });
    }

    private _select(itemId: number) {
        let item: NodesTreeItemWidget = this._nodeMap.get(itemId);
        if (item) {
            let currentSelecteditem: NodesTreeItemWidget = this._nodeMap.get(this._selectedNodeId);
            if (currentSelecteditem) {
                currentSelecteditem.selected = false;
            }
            item.selected = true;
            this._selectedNodeId = itemId;
            this.onSelect(itemId);
        }
    }

    private _makeItem(treeItemData: TreeItemData): NodesTreeItemWidget {
        let newItem = new NodesTreeItemWidget(treeItemData);
        newItem.onClick = treeItemData => {
            this._select(treeItemData.id);
        };
        newItem.onExpand = treeItemData => {
            this.onExpand(treeItemData.id);
        };
        this._nodeMap.set(treeItemData.id, newItem);
        return newItem;
    }

    setError(error: Error): void {
        this._nodeMap.clear();
        this.clear();
        this.add(UIFabric.getLabel(error.message));
    }

    onSelect: (nodeId: number) => any;

    onExpand: (nodeId: number) => any;

}