import { TreeNode } from "../../entity/TreeNode";
import { TreeNodeService } from "../../service/TreeNodeService";
import { AllNodesTableView } from "./AllNodesTableView";

export class AllNodesTablePresenter {

    _view: AllNodesTableView;

    constructor(view: AllNodesTableView) {
        this._view = view;
        this._view.setUpdateBtnHandler(() => {
            this.update();
        });
    }

    update() {
        this._view.setLoading();
        TreeNodeService.getAllNodes()
            .then((nodes: Array<TreeNode>) => this._view.setData(nodes))
            .catch((error: Error) => this._view.setError(error));
    }
}