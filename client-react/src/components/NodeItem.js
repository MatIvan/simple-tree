import React, { Component } from "react";
import { TreeNodeService } from "../service/TreeNodeService"
import styles from '../styles/NodeItem.module.css';

class NodeItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            error: null,
            nodes: [],
        };
    }

    componentDidMount() {
        TreeNodeService.getChildren(this.props.node.id)
            .then(result => {
                this.setState({
                    isLoaded: true,
                    error: null,
                    nodes: result,
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error: error,
                    nodes: [],
                });
            });
    }

    render() {
        const { error, isLoaded, nodes } = this.state;
        let data;

        if (error) {
            data = (<div>Error: {error.message}</div>);
        } else if (!isLoaded) {
            data = (<div>Loading...</div>);
        } else {
            data = nodes.map(node => (
                <NodeItem key={node.id} node={node} />
            ));
        }

        const nodeInfo = this.props.node;
        return (
            <div className={styles.box}>
                <div>
                    <div>{nodeInfo.name}</div>
                </div>
                {data}
            </div>
        );
    }
}

export default NodeItem;
