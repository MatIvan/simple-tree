import { TreeNode } from "../entity/TreeNode";
import TreeNodeService from "../service/TreeNodeService";
import { EditFormView } from "./EditFormView";

export class EditFormPresenter {

    private _view: EditFormView;
    private _onUpdate: (node: TreeNode) => void;
    private _onDelete: (node: TreeNode) => void;

    constructor(view: EditFormView) {
        this._view = view;

        this._view.setOnSaveClick((node: TreeNode) => {
            if (node.id === null) {
                this._add(node);
            } else {
                this._update(node);
            }
        });

        this._view.setOnDeleteClick((nodeId) => {
            this._delete(nodeId);
        });

        this._view.setOnAddClick((parentNode: TreeNode) => {
            let newNode: TreeNode = {
                id: null,
                parentId: parentNode.id,
                name: "name",
                ip: "0.0.0.0",
                port: 0,
            };
            this._view.setNode(newNode);
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

    setOnDelete(onDelete: (node: TreeNode) => void) {
        this._onDelete = onDelete;
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

    private _delete(node: TreeNode) {
        TreeNodeService.deleteNode(node.id).then(() => {
            this._onDelete(node);
        });
    }
}
