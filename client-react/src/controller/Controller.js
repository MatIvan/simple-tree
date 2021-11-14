import { TreeNodeService } from "./TreeNodeService";
import Model from "../model/Model"

export const events = {
    onRefreshAllNodes: "onRefreshAllNodes",
    onItemClicked: "onItemClicked",
    onExpandClicked: "onExpandClicked",
}

class Controller {

    constructor() {
        this._updateAllNodesTableState();
        this._updateTreeRootState();
        this._updateSelectedNodeFormState();
    }

    _handler(name, data) {
        console.log("Controller::handler > ", name, data);

        if (name === events.onRefreshAllNodes) {
            this._updateAllNodesTableState();

        } else if (name === events.onItemClicked) {
            Model.selectItem(data);
            this._setTreeRootState(undefined, false);
            this._updateSelectedNodeFormState();

        } else if (name === events.onExpandClicked) {
            let isNeedToUpdate = Model.togleItem(data);
            if (isNeedToUpdate) {
                TreeNodeService.getChildren(data)
                    .then((result) => {
                        Model.setChildren(data, result);
                        this._setTreeRootState(undefined, false);
                    })
                    .catch((error) => { this._setAllNodesTableState(error, false); });
            } else {
                this._setTreeRootState(undefined, false);
            }
        }
    }

    getHandler() {
        return (name, data) => { this._handler(name, data); }
    }

    // ##### AllNodesTableState

    onAllNodesTableStateChanged(allNodesTableState) { }


    _setAllNodesTableState(error, isLoading) {
        this.allNodesTableState = {
            error: error,
            isLoading: isLoading,
            nodes: Model.allNodes,
        };
        this.onAllNodesTableStateChanged(this.allNodesTableState);
    }

    _updateAllNodesTableState() {
        Model.allNodes = [];
        this._setAllNodesTableState(undefined, true);
        TreeNodeService.getAllNodes()
            .then((result) => {
                Model.allNodes = result;
                this._setAllNodesTableState(undefined, false);
            })
            .catch((error) => { this._setAllNodesTableState(error, false); });
    }

    // ##### TreeRootState

    onTreeRootStateChanged(treeRootState) { }

    _setTreeRootState(error, isLoading) {
        this.treeRootState = {
            error: error,
            isLoading: isLoading,
            treeNodes: Model.getRootTreeNodes(),
        };
        this.onTreeRootStateChanged(this.treeRootState);
    }

    _updateTreeRootState() {
        Model.setRootNodes([]);
        this._setTreeRootState(undefined, true);
        TreeNodeService.getRootNodes()
            .then((result) => {
                Model.setRootNodes(result);
                this._setTreeRootState(undefined, false);
            })
            .catch((error) => { this._setTreeRootState(error, false); });
    }

    // ##### SelectedNodeFormState
    onSelectedNodeFormStateChanged(selectedNodeFormState) { }

    _setSelectedNodeFormState(error, selectedNode) {
        this.selectedNodeFormState = {
            error: error,
            selectedNode: selectedNode,
        };
        this.onSelectedNodeFormStateChanged(this.selectedNodeFormState);
    }

    _updateSelectedNodeFormState() {
        let selectedNodeId = Model.getSelectedNodeId();
        if (selectedNodeId !== undefined) {
            TreeNodeService.getNode(selectedNodeId)
                .then((result) => {
                    this._setSelectedNodeFormState(undefined, result);
                })
                .catch((error) => { this._setSelectedNodeFormState(error, undefined); });

        } else {
            // dont have selection
            this._setSelectedNodeFormState(undefined, undefined);
        }
    }
}

export default new Controller();

