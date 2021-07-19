import React, { Component } from "react";
import Tree from "./Tree"
import NodeCard from "./NodeCard/NodeCard"
import NodeEditPresenter from "./NodeEdit/NodeEditPresenter"
import NodeDeleteForm from "./NodeDelete/NodeDeleteForm"
import styles from '../styles/TreeNodes.module.css';

class TreeNodes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedNodeId: null,
            nodeEditData: {
                visible: false,
                nodeId: null,
                parentId: null
            },
            deleteNodeData: {
                visible: false,
                nodeId: null
            }
        };
    }

    onNodeItemSelected(nodeId) {
        if (nodeId != this.state.selectedNodeId) {
            this.setState({
                selectedNodeId: nodeId
            });
        }
    }

    getHendler() {
        return {
            onEdit: (nodeId) => {
                this._showNodeEdit(nodeId, null)
            },
            onDelete: (nodeId) => {
                this._showNodeDeleteForm(nodeId)
            },
            onAddChild: (parentId) => {
                this._showNodeEdit(null, parentId)
            }
        }
    }

    onNodeSaved() {
        this._hideNodeEdit();
    }

    onNodeDeleted() {
        this._hideNodeDeleteForm();
    }

    _showNodeDeleteForm(nodeId) {
        this.setState({
            deleteNodeData: {
                visible: true,
                nodeId: nodeId
            }
        });
    }

    _hideNodeDeleteForm() {
        this.setState({
            deleteNodeData: {
                visible: false,
                nodeId: null
            }
        });
    }

    _showNodeEdit(nodeId, parentId) {
        this.setState({
            nodeEditData: {
                visible: true,
                nodeId: nodeId,
                parentId: parentId
            }
        });
    }

    _hideNodeEdit() {
        this.setState({
            nodeEditData: {
                visible: false,
                nodeId: null,
                parentId: null
            }
        });
    }

    render() {
        const { selectedNodeId, nodeEditData, deleteNodeData } = this.state;
        return (
            <div className={styles.box}>
                <Tree
                    onNodeItemSelected={this.onNodeItemSelected.bind(this)} />

                <NodeCard
                    selectedNodeId={selectedNodeId}
                    handler={this.getHendler()} />

                {nodeEditData.visible ?
                    <NodeEditPresenter
                        nodeEditData={nodeEditData}
                        onSaved={this.onNodeSaved.bind(this)}
                        onClose={this._hideNodeEdit.bind(this)}
                    />
                    : null
                }

                {deleteNodeData.visible ?
                    <NodeDeleteForm
                        deleteNodeData={deleteNodeData}
                        onDeleted={this.onNodeDeleted.bind(this)}
                        onClose={this._hideNodeDeleteForm.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
}

export default TreeNodes;
