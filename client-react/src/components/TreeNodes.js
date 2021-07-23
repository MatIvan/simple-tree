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
            dataTree: {
                needUpdateTime: null,
                changedNodeId: null,
                parentForNewNode: null,
            },
            dataNodeCard: {
                needUpdateTime: null,
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
                    needUpdateTime: Date.now(),
                    selectedNodeId: nodeId
                }
            });
        }
    }

    getHendler() {
        return {
            onEdit: (nodeId) => {
                this.showNodeEdit(nodeId, null)
            },
            onDelete: (nodeId) => {
                this.showNodeDeleteForm(nodeId)
            },
            onAddChild: (parentId) => {
                this.showNodeEdit(null, parentId)
            }
        }
    }

    onNodeSaved(changedNodeId, parentForNewNode) {
        this.hideNodeEdit();
        this.props.onDataChanged();
        this.setState({
            dataTree: {
                needUpdateTime: Date.now(),
                changedNodeId: changedNodeId,
                parentForNewNode: parentForNewNode,
            },
            dataNodeCard: {
                needUpdateTime: Date.now(),
                selectedNodeId: changedNodeId
            }
        });
    }

    onNodeDeleted() {
        this.hideNodeDeleteForm();
        this.setState({
            dataTree: {
                needUpdateTime: Date.now(),
                changedNodeId: this.state.dataNodeCard.selectedNodeId,
                parentForNewNode: null,
            },
            dataNodeCard: {
                needUpdateTime: Date.now(),
                selectedNodeId: null
            }
        });
        this.props.onDataChanged();
    }

    showNodeDeleteForm(nodeId) {
        this.setState({
            dataDeleteNode: {
                visible: true,
                nodeId: nodeId
            }
        });
    }

    hideNodeDeleteForm() {
        this.setState({
            dataDeleteNode: {
                visible: false,
                nodeId: null
            }
        });
    }

    showNodeEdit(nodeId, parentId) {
        this.setState({
            dataNodeEdit: {
                visible: true,
                nodeId: nodeId,
                parentId: parentId
            }
        });
    }

    hideNodeEdit() {
        this.setState({
            dataNodeEdit: {
                visible: false,
                nodeId: null,
                parentId: null
            }
        });
    }

    render() {
        const { dataTree, dataNodeCard, dataNodeEdit, dataDeleteNode } = this.state;
        return (
            <div className={styles.box}>
                <Tree
                    dataTree={dataTree}
                    onNodeItemSelected={this.onNodeItemSelected.bind(this)} />

                <NodeCard
                    dataNodeCard={dataNodeCard}
                    handler={this.getHendler()} />

                {dataNodeEdit.visible ?
                    <NodeEditPresenter
                        dataNodeEdit={dataNodeEdit}
                        onSaved={this.onNodeSaved.bind(this)}
                        onClose={this.hideNodeEdit.bind(this)}
                    />
                    : null
                }

                {dataDeleteNode.visible ?
                    <NodeDeleteForm
                        dataDeleteNode={dataDeleteNode}
                        onDeleted={this.onNodeDeleted.bind(this)}
                        onClose={this.hideNodeDeleteForm.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
}

export default TreeNodes;
