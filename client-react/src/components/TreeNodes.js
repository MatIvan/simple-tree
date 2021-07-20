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
            dataNodeCard: {
                needUpdate: false,
                selectedNodeId: null,
            },
            dataNodeEdit: {
                visible: false,
                nodeId: null,
                parentId: null
            },
            dataDeleteNode: {
                visible: false,
                nodeId: null
            }
        };
    }

    onNodeItemSelected(nodeId) {
        if (nodeId != this.state.dataNodeCard.selectedNodeId) {
            this.setState({
                dataNodeCard: {
                    needUpdate: true,
                    selectedNodeId: nodeId
                }
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
            },
            onLoaded: () => {
                this.setState({
                    dataNodeCard: {
                        needUpdate: false,
                        selectedNodeId: this.state.dataNodeCard.selectedNodeId
                    }
                });
            }
        }
    }

    onNodeSaved() {
        this._hideNodeEdit();
        this.props.onDataChanged();
        this.setState({
            dataNodeCard: {
                needUpdate: true,
                selectedNodeId: this.state.dataNodeCard.selectedNodeId
            }
        });
    }

    onNodeDeleted() {
        this._hideNodeDeleteForm();
        this.setState({
            dataNodeCard: {
                selectedNodeId: null,
                needUpdate: true,
            }
        });
        this.props.onDataChanged();
    }

    _showNodeDeleteForm(nodeId) {
        this.setState({
            dataDeleteNode: {
                visible: true,
                nodeId: nodeId
            }
        });
    }

    _hideNodeDeleteForm() {
        this.setState({
            dataDeleteNode: {
                visible: false,
                nodeId: null
            }
        });
    }

    _showNodeEdit(nodeId, parentId) {
        this.setState({
            dataNodeEdit: {
                visible: true,
                nodeId: nodeId,
                parentId: parentId
            }
        });
    }

    _hideNodeEdit() {
        this.setState({
            dataNodeEdit: {
                visible: false,
                nodeId: null,
                parentId: null
            }
        });
    }

    render() {
        const { dataNodeCard, dataNodeEdit, dataDeleteNode } = this.state;
        return (
            <div className={styles.box}>
                <Tree
                    onNodeItemSelected={this.onNodeItemSelected.bind(this)} />

                <NodeCard
                    dataNodeCard={dataNodeCard}
                    handler={this.getHendler()} />

                {dataNodeEdit.visible ?
                    <NodeEditPresenter
                        dataNodeEdit={dataNodeEdit}
                        onSaved={this.onNodeSaved.bind(this)}
                        onClose={this._hideNodeEdit.bind(this)}
                    />
                    : null
                }

                {dataDeleteNode.visible ?
                    <NodeDeleteForm
                        dataDeleteNode={dataDeleteNode}
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
