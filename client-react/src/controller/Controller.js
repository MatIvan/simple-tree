import { TreeNodeService } from "./TreeNodeService";
import Model from "../model/Model"
import { Events } from "./Events";

class Controller {

    constructor() {
        this._updateAllNodesTableState();
        this._updateTreeRootState();
        this._updateSelectedNodeFormState();
        this._updateUIPanelState();
        this._updatePopupEditorState();
    }

    _handler(name, data) {
        console.log("Controller::handler > ", name, data);

        switch (name) {

            case Events.onRefreshAllNodes:
                this._updateAllNodesTableState();
                break;

            case Events.onItemClicked:
                Model.selectItem(data);
                this._setTreeRootState(undefined, false);
                this._updateSelectedNodeFormState();
                this._updateUIPanelState();
                break;

            case Events.onExpandClicked:
                let isNeedToUpdate = Model.togleItem(data);
                if (!isNeedToUpdate) {
                    this._setTreeRootState(undefined, false);
                    break;
                }
                TreeNodeService.getChildren(data)
                    .then((result) => {
                        Model.setChildren(data, result);
                        this._setTreeRootState(undefined, false);
                    })
                    .catch((error) => { this._setAllNodesTableState(error, false); });
                break;

            case Events.onAddRootNodeClicked:
                this._setPopupEditorState(true, name, this._getNodeForRootAdd());
                break;

            case Events.onAddNodeClicked:
                this._setPopupEditorState(true, name, this._getNodeForChildAdd());
                break;

            case Events.onEditNodeClicked:
                this._setPopupEditorState(true, name, Model.getSelectedTreeNode());
                break;

            case Events.onDeleteNodeClicked:
                throw new Error("TODO onDeleteNodeClicked");
                break;

            case Events.onPopupEditorSaveClicked:
                throw new Error("TODO onPopupEditorSaveClicked");
                break;

            case Events.onPopupEditorCancelClicked:
                this._updatePopupEditorState();
                break;

            default:
                console.warn(`Unknown event: name=${name} , data=${data}`);
                break;
        }
    }

    getHandler() {
        return (name, data) => { this._handler(name, data); }
    }

    _getNodeForRootAdd() {
        return {
            id: "",
            parentId: "",
            name: "name",
            ip: "ip",
            port: "port"
        }
    }

    _getNodeForChildAdd() {
        return {
            ...this._getNodeForRootAdd(),
            parentId: Model.getSelectedNodeId(),
        }
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

    // ##### UIPanelState
    onUIPanelStateChanged(uiPanelState) { }

    _setUIPanelState(selectedNodeId) {
        this.uiPanelState = {
            selectedNodeId: selectedNodeId,
        };
        this.onUIPanelStateChanged(this.uiPanelState);
    }

    _updateUIPanelState() {
        let selectedNodeId = Model.getSelectedNodeId();
        this._setUIPanelState(selectedNodeId);
    }

    // ##### PopupEditorState
    onPopupEditorStateChanged(popupEditorState) { }

    _setPopupEditorState(visible, event, node) {
        this.popupEditorState = {
            visible: visible,
            event: event,
            node: node,
        };
        this.onPopupEditorStateChanged(this.popupEditorState);
    }

    _updatePopupEditorState() {
        this._setPopupEditorState(false);
    }
}

export default new Controller();

