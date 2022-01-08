import { TreeNode } from "../entity/TreeNode";
import { TreeItem } from "./TreeItem";

export class TreeModel {

    private _nodesMap: Map<number, TreeItem>; //key - nodeId

    constructor() {
        this._nodesMap = new Map<number, TreeItem>();
    }

    getRoots(): TreeItem[] {
        let roots: TreeItem[] = [];
        this._nodesMap.forEach(item => {
            if (item.node.parentId === null) {
                roots.push(item);
            }
        });
        return roots;
    }

    add(node: TreeNode): void {
        let item = this._nodesMap.get(node.id);
        if (item) {
            return;
        }
        item = {
            node: node,
            expand: false,
            selected: false,
            children: [],
        };
        this._nodesMap.set(node.id, item);

        let parentItem = this._nodesMap.get(node.parentId);
        if (parentItem) {
            parentItem.children.push(item);
        }
    }

    remove(node: TreeNode): void {
        let item = this._nodesMap.get(node.id);
        if (!item) {
            return;
        }
        item.children.forEach(val => {
            this.remove(item.node);
        });
        this._nodesMap.delete(node.id);

        let parentItem = this._nodesMap.get(node.parentId);
        if (parentItem) {
            let index = parentItem.children.indexOf(item);
            parentItem.children.splice(index, 1);
        }

    }

    select(node: TreeNode): void {
        this._nodesMap.forEach(item => {
            item.selected = (item.node.id === node.id);
        });
    }

    toggleExpand(node: TreeNode): boolean {
        let item = this._nodesMap.get(node.id);
        if (!item) {
            return;
        }
        item.expand = !item.expand;
        return item.expand;
    }

}
