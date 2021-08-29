import '../../style/nodes-tree.css';
import { TreeNode } from "../../entity/TreeNode";
import { Widget } from "../../ui/Widget";
import { NodesTreeDisplay } from "./NodesTreeDisplay";
import { NodesTreeItem } from './NodesTreeItem';
import { UIFabric } from '../../ui/UIFabric';

const STYLE_MAIN = "nodes-tree";

export class NodesTreeView extends Widget implements NodesTreeDisplay {

    private _nodeMap: Map<number, NodesTreeItem>;// key nodeId
    private _selectedNodeId: number;

    constructor() {
        super(STYLE_MAIN);
        this._nodeMap = new Map<number, NodesTreeItem>();
    }

    addNodes(nodes: TreeNode[]): void {
        nodes.forEach(node => {
            let item: NodesTreeItem = this._nodeMap.get(node.id);
            if (item) {
                item.name = node.name;
            } else {
                let newItem = this._makeItem(node);
                let parentItem: NodesTreeItem = this._nodeMap.get(node.parentId);
                if (parentItem) {
                    parentItem.addItem(newItem);
                } else {
                    this.add(newItem);
                }
            };
        });
    }

    private _select(nodeId: number) {
        let item: NodesTreeItem = this._nodeMap.get(nodeId);
        if (item) {
            let currentSelecteditem: NodesTreeItem = this._nodeMap.get(this._selectedNodeId);
            if (currentSelecteditem) {
                currentSelecteditem.selected = false;
            }
            item.selected = true;
            this._selectedNodeId = nodeId;
        }
    }

    private _makeItem(node: TreeNode): NodesTreeItem {
        let newItem = new NodesTreeItem(node.id, node.name);
        newItem.onClick = nodeId => {
            this._select(nodeId);
            this.onSelect(nodeId);
        };
        newItem.onExpand = nodeId => {
            this.onExpand(nodeId);
        };

        this._nodeMap.set(node.id, newItem);
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