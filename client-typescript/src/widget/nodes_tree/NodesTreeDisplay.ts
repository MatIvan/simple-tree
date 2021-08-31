import { TreeNode } from "../../entity/TreeNode";
import { TreeItemData } from "./TreeItemData";

export interface NodesTreeDisplay {
    addNodes(parentId: number, treeItemData: TreeItemData[]): void;
    setError(error: Error): void;
    onSelect: (nodeId: number) => any;
    onExpand: (nodeId: number) => any;
}