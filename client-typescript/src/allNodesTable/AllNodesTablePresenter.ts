import { TreeNode } from "../entity/TreeNode";
import TreeNodeService from "../service/TreeNodeService";
import { AllNodesTableView } from "./AllNodesTableView";

export class AllNodesTablePresenter {

    private _view: AllNodesTableView;

    constructor(view: AllNodesTableView) {
        this._view = view;
    }

    update(node?: TreeNode) {
        TreeNodeService.getAllNodes()
            .then((data) => {
                this._view.setData(data);
            })
            .catch((err) => {
                this._view.setMessage(err.message);
            });
    }

}
