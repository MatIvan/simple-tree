import TreeNodeService from "../service/TreeNodeService";
import { TreeNode } from "../entity/TreeNode";
import { TreeView } from "./TreeView";

export class TreePresenter {

    private _view: TreeView;

    constructor(view: TreeView) {
        this._view = view;
    }

    update() {
        TreeNodeService.getRootNodes()
            .then((nodes: TreeNode[]) => {
                nodes.forEach(node => this._view.addNode(node));
            });
    }
}