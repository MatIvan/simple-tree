import { TreeNode } from "../../entity/TreeNode";
import { TreeNodeService } from "../../service/TreeNodeService";
import { NodesTreeDisplay } from "./NodesTreeDisplay";
import { TreeItemData } from "./TreeItemData";

export class NodesTreePresenter {
    private _view: NodesTreeDisplay;
    private _loadedParentsIdList: number[] = new Array();

    constructor(view: NodesTreeDisplay) {
        this._view = view;
        this._bind();
    }

    private _bind() {
        this._view.onSelect = (nodeId) => {
            this.onSelected(nodeId);
        };
        this._view.onExpand = (nodeId) => {
            if (!this._hasLoaded(nodeId)) {
                TreeNodeService.getChildren(nodeId)
                    .then(nodeList => { this._addNodesToView(nodeId, nodeList); })
                    .catch(error => { this._view.setError(error); });
            };
        }
    }

    loadRootNodes() {
        TreeNodeService.getRootNodes()
            .then(nodeList => { this._addNodesToView(null, nodeList); })
            .catch(error => { this._view.setError(error); });
    }

    private _hasLoaded(nodeId: number): boolean {
        return this._loadedParentsIdList.indexOf(nodeId) >= 0;
    }

    private _addNodesToView(parentId: number, nodeList: TreeNode[]) {
        if (!this._hasLoaded(parentId)) {
            this._loadedParentsIdList.push(parentId);
        }
        this._view.addNodes(
            parentId,
            nodeList.map<TreeItemData>(node => {
                return {
                    id: node.id,
                    name: node.name
                }
            }));
    }

    onSelected: (nodeId: number) => any;
}