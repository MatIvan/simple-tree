import React, { Component } from "react";
import { TreeNodeService } from "../service/TreeNodeService"
import Tree from "./Tree"
import NodeCard from "./NodeCard"
import NodePopupForm from "./NodePopupForm"
import styles from '../styles/TreeNodes.module.css';

class TreeNodes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedNodeId: null,
            nodePopupFormData: {
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
                console.log("onEdit: ", nodeId);
                this.setState({
                    nodePopupFormData: {
                        visible: true,
                        nodeId: nodeId,
                        parentId: null
                    }
                });
            },
            onDelete: (nodeId) => {
                console.log("onDelete: ", nodeId);
            },
            onAddChild: (parentId) => {
                console.log("onAddChild: ", parentId);
                this.setState({
                    nodePopupFormData: {
                        visible: true,
                        nodeId: null,
                        parentId: nodeId
                    }
                });
            }
        }
    }

    onPopupCancel() {
        console.log("onPopupCancel: ");
        this.setState({
            nodePopupFormData: {
                visible: false,
                nodeId: null,
                parentId: null
            }
        });
    }

    onPopupSave() {
        console.log("onPopupSave: ");
        this.setState({
            nodePopupFormData: {
                visible: false,
                nodeId: null,
                parentId: null
            }
        });
    }

    render() {
        const { selectedNodeId, nodePopupFormData } = this.state;
        return (
            <div className={styles.box}>
                <Tree onNodeItemSelected={this.onNodeItemSelected.bind(this)} />
                <NodeCard selectedNodeId={selectedNodeId} handler={this.getHendler()} />
                {nodePopupFormData.visible ?
                    <NodePopupForm
                        nodeId={nodePopupFormData.nodeId}
                        parentId={nodePopupFormData.parentId}
                        onSave={this.onPopupSave.bind(this)}
                        onCancel={this.onPopupCancel.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
}

export default TreeNodes;
