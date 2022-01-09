import { TreeNode } from "../entity/TreeNode";
import TreeNodeService from "../service/TreeNodeService";
import { EditFormView } from "./EditFormView";

export class EditFormPresenter {

    private _view: EditFormView;
    private _onUpdate: (node: TreeNode) => void;

    constructor(view: EditFormView) {
        this._view = view;
        this._view.setOnSaveClick((node: TreeNode) => {
            if (node.id == null) {
                this._add(node);
            } else {
                this._update(node);
            }
        });
    }

    setNode(nodeId: number) {
        TreeNodeService.getNode(nodeId).then(treeNode => {
            this._view.setNode(treeNode);
        });
    }

    setOnUpdate(onUpdate: (node: TreeNode) => void) {
        this._onUpdate = onUpdate;
    }

    private _update(node: TreeNode) {
        TreeNodeService.updateNode(node).then((updatedNode) => {
            this._onUpdate(updatedNode);
        });
    }

    private _add(node: TreeNode) {
        TreeNodeService.addNode(node).then((newNode) => {
            this._onUpdate(newNode);
        });
    }
}
