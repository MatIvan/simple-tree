import React, { Component } from "react";
import { TreeNodeService } from "../service/TreeNodeService"
import Tree from "./Tree"
import NodeCard from "./NodeCard/NodeCard"
import NodeEditPresenter from "./NodeEdit/NodeEditPresenter"
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
            }
        };
    }

    componentDidMount() {
        //do nothing
    }

    onNodeItemSelected(nodeId) {
        if (nodeId != this.state.selectedNodeId) {
            this.setState({
                selectedNodeId: nodeId
            });
        }
    }

    getHendler() {
        let self = this;
        return {
            onEdit: (nodeId) => {
                this._showNodeEdit(nodeId, null)
            },
            onDelete: (nodeId) => {

            },
            onAddChild: (parentId) => {
                this._showNodeEdit(null, parentId)
            }
        }
    }

    onNodeSaved() {
        console.log("onNodeSaved");
        this._hideNodeEdit();
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

    onNodeEditClose() {
        this.setState({
            nodeEditData: {
                visible: false,
                nodeId: null,
                parentId: null
            }
        });
    }

    render() {
        const { selectedNodeId, nodeEditData } = this.state;
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
                        onClose={this.onNodeEditClose.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
}

export default TreeNodes;
