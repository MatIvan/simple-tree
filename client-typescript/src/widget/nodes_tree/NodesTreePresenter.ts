import { TreeNode } from "../../entity/TreeNode";
import { TreeNodeService } from "../../service/TreeNodeService";
import { NodesTreeDisplay } from "./NodesTreeDisplay";

export class NodesTreePresenter {
    private _view: NodesTreeDisplay;

    constructor(view: NodesTreeDisplay) {
        this._view = view;
        this._bind();
    }

    private _bind() {
        this._view.onSelect = (nodeId) => {
            this.onSelected(nodeId);
        };

        this._view.onExpand = (nodeId) => {
            TreeNodeService.getChildren(nodeId)
                .then(nodeList => { this._view.addNodes(nodeList); })
                .catch(error => { this._view.setError(error); });
        };
    }

    loadRootNodes() {
        TreeNodeService.getRootNodes()
            .then(nodeList => { this._view.addNodes(nodeList); })
            .catch(error => { this._view.setError(error); });
    }

    onSelected: (nodeId: number) => any;
}