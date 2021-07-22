import React, { Component } from "react";
import { TreeNodeService } from "../service/TreeNodeService"
import NodeItem from "./NodeItem"
import styles from '../styles/Tree.module.css';

class Tree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            error: null,
            rootNodes: [],
            selectedNodeId: null,
        };
    }

    componentDidMount() {
        this.sendGetRootNodes();
    }

    componentDidUpdate(prevProp) {
        if (this.props.dataTree.needUpdateTime != prevProp.dataTree.needUpdateTime) {
            if (this.hasNodeById(this.props.dataTree.changedNodeId)) {
                this.sendGetRootNodes();
            }
        }
    }

    hasNodeById(nodeId) {
        return this.state.rootNodes.find(node => node.id == nodeId);
    }

    sendGetRootNodes() {
        TreeNodeService.getRootNodes()
            .then(result => {
                this.setState({
                    isLoaded: true,
                    error: null,
                    rootNodes: result,
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error: error,
                    rootNodes: [],
                    selectedNodeId: null,
                });
            });
    }

    onNodeItemClick(nodeId) {
        if (nodeId != this.state.selectedNodeId) {
            this.setState({
                selectedNodeId: nodeId
            });
        }
        this.props.onNodeItemSelected(nodeId);
    }

    render() {
        const { error, isLoaded, rootNodes, selectedNodeId } = this.state;
        const { needUpdateTime, changedNodeId } = this.props.dataTree;
        let data;

        if (error) {
            data = (<div>Error: {error.message}</div>);
        } else if (!isLoaded) {
            data = (<div>Loading...</div>);
        } else {
            data = rootNodes.map(node => (
                <NodeItem
                    key={node.id}
                    node={node}
                    onNodeItemClick={this.onNodeItemClick.bind(this)}
                    selectedNodeId={selectedNodeId}
                    changedNodeId={changedNodeId}
                    needUpdateTime={needUpdateTime}
                />
            ));
        }

        return (
            <div className={styles.box}>
                {data}
            </div>
        );
    }
}

export default Tree;
