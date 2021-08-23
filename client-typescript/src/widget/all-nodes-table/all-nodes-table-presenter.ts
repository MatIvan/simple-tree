import { TreeNode } from "../../entity/tree-node";
import { TreeNodeService } from "../../service/tree-node-service";
import { UIElement } from "../../ui/ui-element";
import { AllNodesTableView } from "./all-nodes-table-view";

export class AllNodesTablePresenter {

    _view: AllNodesTableView;

    constructor(view: AllNodesTableView) {
        this._view = view;
    }

    go(parent: UIElement) {
        parent.add(this._view);
    }

    update() {
        this._view.setLoading();
        TreeNodeService.getAllNodes()
            .then((nodes: Array<TreeNode>) => this._view.setData(nodes))
            .catch((error: Error) => this._view.setError(error));
    }
}