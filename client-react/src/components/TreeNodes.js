import React, { Component } from "react";
import { TreeNodeService } from "../service/TreeNodeService"
import Tree from "./Tree"
import NodeCard from "./NodeCard"
import styles from '../styles/TreeNodes.module.css';

class TreeNodes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedNodeId: null,
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

    render() {
        const { selectedNodeId } = this.state;
        return (
            <div className={styles.box}>
                <Tree onNodeItemSelected={this.onNodeItemSelected.bind(this)} />
                <NodeCard selectedNodeId={selectedNodeId} />
            </div>
        );
    }
}

export default TreeNodes;
