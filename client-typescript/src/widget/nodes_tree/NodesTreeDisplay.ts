import { TreeNode } from "../../entity/TreeNode";

export interface NodesTreeDisplay {
    addNodes(nodes: Array<TreeNode>): void;
    setError(error: Error): void;
    onSelect: (nodeId: number) => any;
    onExpand: (nodeId: number) => any;
}