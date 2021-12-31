import { TreeNode } from "../entity/TreeNode";

export type TreeItem = {
    node: TreeNode,
    expand: boolean,
    selected: boolean,
    children: TreeItem[],
}
