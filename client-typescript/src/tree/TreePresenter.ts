import TreeNodeService from "../service/TreeNodeService";
import { TreeNode } from "../entity/TreeNode";
import { TreeView } from "./TreeView";
import { TreeModel } from "./TreeModel";
import { TreeItem } from "./TreeItem";

export class TreePresenter {

    private _view: TreeView;
    private _model: TreeModel;
    private _onSelect: (nodeId: number) => void;

    constructor(view: TreeView) {
        this._view = view;
        this._model = new TreeModel();

        this._view.setOnClick((item: TreeItem) => {
            this._model.select(item.node);
            this._view.draw(this._model.getRoots());
            this._onSelect(item.node.id);
        });
        this._view.setOnBtnClick((item: TreeItem) => {
            let isExpand = this._model.toggleExpand(item.node);
            if (isExpand) {
                TreeNodeService.getChildren(item.node.id)
                    .then((nodes: TreeNode[]) => {
                        nodes.forEach(node => this._model.add(node));
                        this._view.draw(this._model.getRoots());
                    });
            }
            this._view.draw(this._model.getRoots());
        });
    }

    update() {
        TreeNodeService.getRootNodes()
            .then((nodes: TreeNode[]) => {
                nodes.forEach(node => this._model.add(node));
                this._view.draw(this._model.getRoots());
            });
    }

    setOnSelect(onSelect: (nodeId: number) => void) {
        this._onSelect = onSelect;
    }
}
