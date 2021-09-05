import '../../style/nodes-tree.css';
import { Label } from '../../ui/Label';
import { VerticalPanel } from '../../ui/VerticalPanel';
import { NodesTreeDisplay } from "./NodesTreeDisplay";
import { NodesTreeItemWidget } from './NodesTreeItemWidget';
import { TreeItemData } from './TreeItemData';

const STYLE_MAIN = "nodes-tree";

export class NodesTreeView extends VerticalPanel implements NodesTreeDisplay {

    private _nodeMap: Map<number, NodesTreeItemWidget>;// key nodeId
    private _selectedNodeId: number;

    constructor() {
        super();
        this.addStyle(STYLE_MAIN);
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
                item.getParent().remove(item);
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
        this.add(new Label(error.message));
    }

    onSelect: (nodeId: number) => any;

    onExpand: (nodeId: number) => any;

}