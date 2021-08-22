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
        // TODO TreeNodeService.getAllNodes().then
    }
}