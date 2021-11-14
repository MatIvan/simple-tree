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
    }

    _handler(name, data) {
        console.log("Controller::handler > ", name, data);

        if (name === events.onRefreshAllNodes) {
            this._updateAllNodesTableState();

        } else if (name === events.onItemClicked) {
            Model.selectItem(data);
            this._setTreeRootState(undefined, false);

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
}

export default new Controller();

